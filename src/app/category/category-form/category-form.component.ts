import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/Category';
import {CategoryNameAsyncValidatorService} from './category-name-async-validator.service';
import {MaxLengthAndDuplicateErrorStateMatcher} from '../../error-state-matchers/max-length-and-duplicate-error-state-matcher';

export const ADD_MODE = 'add';
export const EDIT_MODE = 'edit';

export const NAME_CHAR_MIN = 3;
export const NAME_CHAR_MAX = 20;
export const DESC_CHAR_MAX = 250;

export const PROC_SAVE = 'save';
export const PROC_UPDATE = 'update';
export const PROC_DELETE = 'delete';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    animations: [
        trigger('controlsSwitch', [
            transition(':enter', [
                style({
                    width: '100%',
                    position: 'absolute',
                    left: '105%',
                    opacity: 0
                }),
                animate('0.5s ease-in', style({left: 0})),
                animate('0.5s ease-out', style({opacity: 1})),
            ]),
            transition(':leave', [
                style({
                    width: '100%',
                    position: 'absolute',
                    left: 0,
                    opacity: 1
                }),
                animate('0.5s ease-in', style({left: '105%'})),
                animate('0.5s ease-out', style({opacity: 0})),
            ])
        ])
    ]
})
export class CategoryFormComponent implements OnInit, OnChanges {

    readonly ADD_MODE: string = ADD_MODE;
    readonly EDIT_MODE: string = EDIT_MODE;

    readonly NAME_CHAR_MIN: number = NAME_CHAR_MIN;
    readonly NAME_CHAR_MAX: number = NAME_CHAR_MAX;
    readonly DESC_CHAR_MAX: number = DESC_CHAR_MAX;

    readonly PROC_SAVE: string = PROC_SAVE;
    readonly PROC_UPDATE: string = PROC_UPDATE;
    readonly PROC_DELETE: string = PROC_DELETE;

    @Input()
    mode: string = null;

    @Input()
    category: Category = null;

    @Input()
    processing: boolean = false;

    @Input()
    process: string = null;

    @Output('save')
    saveEvent = new EventEmitter<Category>();

    @Output('update')
    updateEvent = new EventEmitter<Category>();

    @Output('revert')
    revertEvent = new EventEmitter<any>();

    @Output('delete')
    deleteEvent = new EventEmitter<Category>();

    @Output('discard')
    discardEvent = new EventEmitter<any>();

    @Output('swap')
    swapEvent = new EventEmitter<Category>();

    form: FormGroup = null;

    maxLengthAndNameMatcher = new MaxLengthAndDuplicateErrorStateMatcher();

    constructor(private categoryNameValidator: CategoryNameAsyncValidatorService) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const category = changes['category'];
        if (category?.previousValue !== category?.currentValue) {
            this.initForm();
            this.swapEvent.emit(category?.currentValue);
        }
        const processing = changes['processing'];
        if (!processing?.previousValue && processing?.currentValue) {
            this.form.disable();
        } else if (processing?.previousValue && !processing?.currentValue) {
            this.form.enable();
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            name: new FormControl(
                {value: this?.category?.name || '', disabled: false},
                {
                    validators: [
                        Validators.required,
                        Validators.minLength(NAME_CHAR_MIN),
                        Validators.maxLength(NAME_CHAR_MAX)
                    ], asyncValidators: [
                        this.categoryNameValidator.validate.bind(this.categoryNameValidator)
                    ]
                }),
            description: new FormControl({value: this?.category?.description || '', disabled: false},
                [
                    Validators.maxLength(DESC_CHAR_MAX)
                ])
        });
    }

    save(): void {
        this.saveEvent.emit(this.getCategory());
    }

    update(): void {
        const category = this.getCategory();
        category.id = this.category.id;
        this.updateEvent.emit(category);
    }

    revert(): void {
        this.initForm();
        this.revertEvent.emit();
    }

    discard(): void {
        this.initForm();
        this.discardEvent.emit();
    }

    delete(): void {
        this.deleteEvent.emit(this.category);
    }

    get name(): AbstractControl {
        return this.form.get('name');
    }

    get description(): AbstractControl {
        return this.form.get('description');
    }

    private getCategory(): Category {
        return new Category(this.form.value);
    }
}
