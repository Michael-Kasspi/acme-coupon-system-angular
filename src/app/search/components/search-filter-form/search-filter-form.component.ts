import {AfterViewInit, ChangeDetectorRef, Component, Directive, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../model/Category';
import {AbstractControl, NG_VALIDATORS, NgModel, ValidationErrors, Validator} from '@angular/forms';
import {Company} from '../../../model/Company';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

abstract class SearchOption {
    public static readonly DELIMITER = ';';

    public readonly fieldName: string = null;


    protected constructor(fieldName: string) {
        this.fieldName = fieldName;
    }

    abstract toSearchParam(): string;
}

abstract class FilterOption<T> extends SearchOption {
    protected readonly filterName: string = null;

    public value: T = null;

    protected constructor(filterName: string, fieldName: string) {
        super(fieldName);
        this.filterName = filterName;
    }
}

class IdFilterOption extends FilterOption<Company | Category> {

    constructor(filterName: string) {
        super(filterName, 'id');
    }

    public toSearchParam(): string {
        return [
            this.filterName,
            this.fieldName,
            this.value.id + ''
        ].join(SearchOption.DELIMITER);
    }
}

class SortOption extends SearchOption {
    public static readonly DESC = 'desc';
    private static readonly ASC = 'asc';

    public readonly name: string = null;
    public readonly fieldName: string = null;
    public selected: boolean = false;
    public descending: boolean = false;

    constructor(name: string, fieldName: string, descending?: boolean) {
        super(fieldName);
        this.name = name;
        this.fieldName = fieldName;
        this.descending = descending;
    }

    public toSearchParam(): string {
        const direction = this.descending ? SortOption.DESC : SortOption.ASC;
        return [this.fieldName, direction].join(SearchOption.DELIMITER);
    }
}

abstract class RangeOption<T> extends SearchOption {
    public static readonly BETWEEN: string = 'between';
    public static readonly ABOVE: string = 'above';
    public static readonly BELOW: string = 'below';
    public static readonly EXC: string = 'exc';
    public static readonly INC: string = 'inc';

    protected constructor(
        fieldName: string,
        public fromValue: T = null,
        public untilValue: T = null,
        public excFrom: boolean = false,
        public excUntil: boolean = false
    ) {
        super(fieldName);
    }

    protected selectRangeType(): string {
        if (this.fromValue != null && this.untilValue != null) {
            return RangeOption.BETWEEN;
        } else if (this.fromValue != null && this.untilValue == null) {
            return RangeOption.ABOVE;
        }
        return RangeOption.BELOW;
    }
}

class DateRangeOption extends RangeOption<Date> {

    constructor(fieldName: string) {
        super(fieldName);
    }

    public toSearchParam(): string {
        const result = [this.selectRangeType(), this.fieldName];
        DateRangeOption.pushIfExists(this.fromValue, result);
        DateRangeOption.pushIfExists(this.untilValue, result);
        return result.join(RangeOption.DELIMITER);
    }

    private static pushIfExists(value: Date, arr: string[]): void {
        if (!value) {
            return;
        }

        arr.push(serializeDate(value).substr(0, 10));
        arr.push(RangeOption.INC);

        function serializeDate(date: Date): string {
            let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
            let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
            date.setHours(hoursDiff);
            date.setMinutes(minutesDiff);
            return date.toJSON();
        }
    }
}

class NumberRangeOption extends RangeOption<number> {
    constructor(fieldName: string, fromValue?: number) {
        super(fieldName, fromValue);
    }

    toSearchParam(): string {
        const result = [this.selectRangeType(), this.fieldName];
        NumberRangeOption.pushIfExists(this.fromValue, this.excFrom, result);
        NumberRangeOption.pushIfExists(this.untilValue, this.excUntil, result);
        return result.join(RangeOption.DELIMITER);
    }

    private static pushIfExists(value: number, exclude: boolean, arr: string[]): void {
        if (value == null) {
            return;
        }

        arr.push(value + '');
        arr.push(exclude ? RangeOption.EXC : RangeOption.INC);
    }
}

@Directive({
    selector: '[valueExists]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValueExistsValidator, multi: true}]
})
export class ValueExistsValidator implements Validator {

    @Input('valueExists')
    value: any = null;

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (typeof value === 'string' && value !== '') {
            return {noSuchValue: true};
        }
        return null;
    }
}

export class SearchOptionParams {
    constructor(
        private filter: string = '',
        private sort: string = '',
        private range: string = ''
    ) {
    }
}

@Component({
    selector: 'app-search-filter-form',
    templateUrl: './search-filter-form.component.html',
    styleUrls: ['./search-filter-form.component.scss']
})
export class SearchFilterFormComponent implements OnInit, AfterViewInit {

    private readonly CATEGORY: string = 'category';
    private readonly COMPANY: string = 'company';
    private readonly PRICE: string = 'price';
    private readonly START_DATE: string = 'startDate';
    private readonly END_DATE: string = 'endDate';
    private readonly AMOUNT: string = 'amount';

    private readonly FILTER: string = 'filter';
    private readonly SORT: string = 'sort';
    private readonly RANGE: string = 'range';
    private readonly COMMA: string = ',';

    private readonly NUMBER: string = 'number';
    private readonly DATE: string = 'date';

    private readonly ZERO: number = 0;

    private readonly rangeFieldType: Map<string, string> = new Map([
        [this.PRICE, this.NUMBER], [this.START_DATE, this.DATE],
        [this.END_DATE, this.DATE], [this.AMOUNT, this.NUMBER]
    ]);

    public companyFilter: IdFilterOption = new IdFilterOption(this.COMPANY);
    public categoryFilter: IdFilterOption = new IdFilterOption(this.CATEGORY);

    public priceRange: RangeOption<any> = new NumberRangeOption(this.PRICE);
    public addedDateRange: RangeOption<any> = new DateRangeOption(this.START_DATE);
    public expiryDateRange: RangeOption<any> = new DateRangeOption(this.END_DATE);
    public amountRange: RangeOption<any> = new NumberRangeOption(this.AMOUNT, this.ZERO);

    public categories: Category[] = [];
    public companies: Company[] = [];

    public active: boolean = false;

    /**
     * Map used to access filters.
     */
    private readonly filterMap: Map<string, IdFilterOption> = new Map([
        [this.COMPANY, this.companyFilter],
        [this.CATEGORY, this.categoryFilter]
    ]);

    /**
     * Filter entries map used to select the corresponding array of entries.
     */
    private readonly filterEntriesMap: Map<string, Company[] | Category[]> = new Map();


    /**
     * Map used to generate sort options.
     */
    private readonly sortMap: Map<string, SortOption> = new Map([
        [this.PRICE, new SortOption('Price', this.PRICE)],
        [this.START_DATE, new SortOption('Date Added', this.START_DATE)],
        [this.END_DATE, new SortOption('Expiry Date', this.END_DATE)],

    ]);

    /**
     * The sort options generated from sort field pairs.
     */
    public readonly sortOptions: SortOption[] = Array.from(this.sortMap)
        .map((pair: [string, SortOption]) => pair[1]);

    private rangeOptionsMap: Map<string, RangeOption<any>> = new Map([
        [this.PRICE, this.priceRange],
        [this.START_DATE, this.addedDateRange],
        [this.END_DATE, this.expiryDateRange],
        [this.AMOUNT, this.amountRange],
    ]);

    @ViewChild('company')
    private companyNgModel: NgModel = null;

    @ViewChild('category')
    private categoryNgModel: NgModel = null;

    public filteredCategories: Observable<Category[]> = null;
    public filteredCompanies: Observable<Company[]> = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<SearchFilterFormComponent>,
        private activatedRoute: ActivatedRoute,
        private cdRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.initData();
        this.initFilterEntriesMap();
        this.initFieldsFromParams();
    }

    ngAfterViewInit(): void {
        this.initAutocomplete();
    }

    public displayFn(value): string {
        return value && value.name ? value.name : '';
    }

    public selectFilter(control: AbstractControl, options: any[]) {
        const value = control.value;
        if (typeof value === 'string' && value !== '') {
            const valueString = value.toLowerCase();
            const obj = options.find(option => option.name.toLowerCase().includes(valueString));
            if (obj) {
                control.patchValue(obj);
            }
        }
    }

    public dropSortOption(event: CdkDragDrop<SortOption[]>) {
        moveItemInArray(this.sortOptions, event.previousIndex, event.currentIndex);
    }

    public generateSearchParams(): void {
        const filter = Array.from(this.filterMap)
            .map((entry: [string, FilterOption<any>]) => entry[1])
            .filter((option: FilterOption<any>) => !!option.value)
            .map((option: SearchOption) => option.toSearchParam())
            .join(this.COMMA);

        const sort = this.sortOptions
            .filter((option: SortOption) => option.selected)
            .map((option: SearchOption) => option.toSearchParam())
            .join(this.COMMA);

        const range = Array.from(this.rangeOptionsMap)
            .map((entry: [string, RangeOption<any>]) => entry[1])
            .filter((option: RangeOption<any>) => { /*filter out out of stock if false*/
                if (option.fieldName !== this.AMOUNT) {
                    return true;
                }
                return option.excFrom;
            })
            .filter((option: RangeOption<any>) => (option.fromValue != null || option.untilValue != null))
            .map((option: SearchOption) => option.toSearchParam())
            .join(this.COMMA);

        this.dialogRef.close(new SearchOptionParams(filter, sort, range));
    }

    public clearSearchParams(): void {
        this.dialogRef.close(new SearchOptionParams('', '', ''));
    }

    public initFieldsFromParams(): void {
        this.activatedRoute.queryParamMap.subscribe(params => {
            const filter = params.get(this.FILTER);
            const sort = params.get(this.SORT);
            const range = params.get(this.RANGE);

            if (filter) {
                this.initFilters(filter);
            }
            if (sort) {
                this.initSorts(sort);
            }
            if (range) {
                this.initRanges(range);
            }

            this.active = (!!filter || !!sort || !!range);
        });
    }

    private initData(): void {
        this.categories = this.data.categories;
        this.companies = this.data.companies;
    }

    private initSorts(sort): void {
        const name = 0;
        const direction = 1;
        const args = 2;

        sort.split(this.COMMA).forEach(value => {

            const sort = value.split(SearchOption.DELIMITER);

            if (sort.length < args) {
                return;
            }

            const sortName = sort[name];
            const sortDirection = sort[direction];

            const sortOption = this.sortMap.get(sortName);

            if (!sortOption) {
                return;
            }

            sortOption.selected = true;
            sortOption.descending = sortDirection === SortOption.DESC;

            const index = this.sortOptions.findIndex(option => option.name === sortOption.name);
            this.sortOptions.splice(index, 1);
            this.sortOptions.push(sortOption);
        });
        this.sortOptions.sort((optionA: SortOption, optionB: SortOption) => {
            return optionA.selected === optionB.selected ? 0 : -1;
        });
    }

    private initFilters(filter: string) {
        const name = 0;
        const field = 1;
        const term = 2;
        const args = 3;

        filter.split(this.COMMA).forEach(value => {

            const split = value.split(SearchOption.DELIMITER);

            if (split.length < args) {
                return;
            }

            const filterName = split[name];
            const filterField = split[field];
            const filterTerm = split[term];

            const filterOption = this.filterMap.get(filterName.toString());
            const entries = this.filterEntriesMap.get(filterName.toString());

            if (!filterOption || !entries) {
                return;
            }

            const entry = entries.find(entry => entry[filterField.toString()] + '' === filterTerm.toString());
            if (entry) {
                filterOption.value = entry;
            }
        });
    }

    private initRanges(range: string): void {
        const type = 0;
        const field = 1;
        const from = 2;
        const excFrom = 3;
        const to = 4;
        const excTo = 5;

        const minArgs = 4;
        const maxArgs = 6;

        const between = RangeOption.BETWEEN.toString();
        const above = RangeOption.ABOVE.toString();
        const below = RangeOption.BELOW.toString();


        range.split(this.COMMA).forEach(value => {
            const range = value.split(SearchOption.DELIMITER);
            const argsAmount = range.length;

            if (argsAmount < minArgs) {
                return;
            }

            const rangeType = range[type].toString();
            const rangeField = range[field].toString();
            const rangeFrom = this.convertToType(range[from], rangeField);
            const rangeExcFrom = range[excFrom].toString() === RangeOption.EXC.toString();
            let rangeTo = null;
            let rangeExecTo = false;

            if (argsAmount >= maxArgs) {
                rangeTo = this.convertToType(range[to], rangeField);
                rangeExecTo = range[excTo].toString() === RangeOption.EXC.toString();
            }
            const rangeOption = this.rangeOptionsMap.get(rangeField);

            if (!rangeOption) {
                return;
            }

            switch (rangeType) {
                case between:
                    rangeOption.fromValue = rangeFrom;
                    rangeOption.excFrom = rangeExcFrom;
                    rangeOption.untilValue = rangeTo;
                    rangeOption.excUntil = rangeExecTo;
                    break;
                case above:
                    rangeOption.fromValue = rangeFrom;
                    rangeOption.excFrom = rangeExcFrom;
                    break;
                case below:
                    rangeOption.untilValue = rangeFrom;
                    rangeOption.excUntil = rangeExcFrom;
                    break;
                default:
                    return;
            }
        });
    }

    private convertToType(value: any, field: string): Date | number {
        const type = this.rangeFieldType.get(field);

        switch (type) {
            case this.DATE:
                return new Date(value);
            case this.NUMBER:
                return +value;
            default:
                return value;
        }
    }

    private initFilterAutocomplete(control: AbstractControl, options: any[]): Observable<any> {
        return control.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value?.name || value),
                map(name => name ? this.filter(name, options) : options.slice())
            );
    }

    private filter(value: string, options: any[]): any[] {
        if (!value) {
            return options;
        }
        const filterValue = value.toLowerCase();
        return options.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    private initAutocomplete(): void {
        const companyControl = this.companyNgModel.control;
        const categoryControl = this.categoryNgModel.control;
        if (companyControl) {
            this.filteredCompanies = this.initFilterAutocomplete(companyControl, this.companies);
            this.cdRef.detectChanges();
        }

        if (categoryControl) {
            this.filteredCategories = this.initFilterAutocomplete(categoryControl, this.categories);
            this.cdRef.detectChanges();
        }
    }

    private initFilterEntriesMap(): void {
        this.filterEntriesMap.set(this.CATEGORY, this.categories);
        this.filterEntriesMap.set(this.COMPANY, this.companies);
    }
}
