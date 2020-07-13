import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ResultPage} from '../model/ResultPage';
import {Coupon} from '../model/Coupon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Company} from '../model/Company';
import {Category} from '../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {SearchFilterFormComponent, SearchOptionParams} from './components/search-filter-form/search-filter-form.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator)
    paginator: MatPaginator = null;

    public resultPage: ResultPage<Coupon> = null;
    public companies: Company[] = null;
    public categories: Category[] = null;
    public activeFilters: boolean = false;
    private resolver$: Subscription = null;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.isFiltersActive();
        this.resolver$ = this.activatedRoute.data.subscribe(
            (data: {
                resultPage: ResultPage<Coupon>,
                companies: Company[],
                categories: Category[]
            }) => {
                this.resultPage = data.resultPage;
                this.companies = data.companies;
                this.categories = data.categories;
                this.handleEmptyPage();
            }
        );
    }

    ngOnDestroy(): void {
        this.resolver$.unsubscribe();
    }

    public get coupons(): Coupon[] {
        return this.resultPage?.content;
    }

    public handlePageEvent(event: PageEvent) {
        this.commitSearch({
            size: event.pageSize,
            page: event.pageIndex
        });
    }

    public openSearchFilters(): void {
        this.dialog.open(SearchFilterFormComponent, {
            data: {
                companies: this.companies,
                categories: this.categories
            }
        }).afterClosed().subscribe((params: SearchOptionParams) => {
            if (!params) {
                this.activeFilters = false;
                return;
            }
            this.commitSearch(Object.assign(params, {page: 0}));
            this.activeFilters = true;
        });
    }

    private commitSearch(params: Params): void {
        this.router.navigate(
            ['/search'],
            {queryParams: params, queryParamsHandling: 'merge'}
        );
    }

    private handleEmptyPage(): void {
        if (this.resultPage && this.resultPage.empty && this.resultPage.totalElements > 0) {
            this.commitSearch({page: 0});
        }
    }

    private isFiltersActive(): void {
        this.activatedRoute.queryParamMap.subscribe(params => {
            this.activeFilters = !!(!!params.get('filter') || params.get('sort') || !!params.get('range'));
        });
    }
}
