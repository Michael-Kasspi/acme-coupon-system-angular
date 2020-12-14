import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryManagerService} from './category-manager.service';
import {Category} from '../../model/Category';
import {delay, filter, finalize, first, flatMap, map, tap} from 'rxjs/operators';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ADD_MODE, EDIT_MODE, PROC_DELETE, PROC_SAVE, PROC_UPDATE} from '../category-form/category-form.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {WarningDialogComponent} from '../../dialog/warning-dialog/warning-dialog.component';

export const SIDE_NAV_WIDTH = '50%';
export const SIDE_NAV_TRANSITION_MS = 500;

@Component({
    selector: 'app-category-manager',
    templateUrl: './category-manager.component.html',
    styleUrls: ['./category-manager.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({opacity: 0.4}),
                animate('0.4s ease-in', style({opacity: 1}))
            ])
        ]),
        trigger('fadeOut', [
            transition(':leave', [
                style({opacity: 1}),
                animate('0.2s ease', style({opacity: 0}))
            ])
        ])
    ]
})
export class CategoryManagerComponent implements OnInit, AfterViewInit {

    @ViewChild('sidenav')
    sidenav: ElementRef = null;

    showFab: boolean = true;

    categories: Category[] = undefined;

    querying: boolean = false;
    processing: boolean = false;
    process: string = null;
    lockDeleteRow: boolean = false;
    notFound: boolean = false;

    constructor(
        public service: CategoryManagerService,
        private progressBar: ManualProgressBarService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cdf: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    ngAfterViewInit(): void {
        this.openSidenavEdit();
    }

    getAllCategories() {
        this.service
            .getAllCategories()
            .pipe(first())
            .subscribe(
                categories => this.categories = categories,
                error => this.categories = null
            );
    }

    openSidenavEdit() {
        this.activatedRoute.queryParamMap.subscribe(params => {
            const id = +params.get('edit');
            if (id) {
                this.querying = true;
                this.fetchCategory(id)
                    .pipe(first(), finalize(() => this.querying = false))
                    .subscribe(
                        category => this.service.edit = category,
                        error => {
                            this.notFound = true;
                        });
            }
        });
    }

    openSidenav() {
        this.sidenav.nativeElement.style.width = SIDE_NAV_WIDTH;
        this.showFab = false;
        this.cdf.detectChanges();
    }

    closeSidenav(): Observable<any> {
        return new Observable(consumer => {
            this.sidenav.nativeElement.style.transition = `${SIDE_NAV_TRANSITION_MS}ms`;
            this.sidenav.nativeElement.style.width = '0';
            this.showFab = true;
            consumer.next();
        }).pipe(first(), delay(SIDE_NAV_TRANSITION_MS));

    }

    editCategory(category: Category): void {
        this.querying = true;
        this.service.add = null;
        this.setQueryParams(category.id).then(() => {
            if (this.categories) {
                this.service.edit = category;
                this.openSidenav();
                setTimeout(() => this.querying = false, 350);
            } else {
                this.fetchCategory(category.id)
                    .pipe(finalize(() => this.querying = false))
                    .subscribe(category => this.service.edit = category);
            }
        });

    }

    saveCategory(category: Category): void {
        this.processing = true;
        this.process = PROC_SAVE;
        this.service.saveCategory(category)
            .pipe(finalize(() => this.postProcessing()))
            .subscribe(category => {
                this.setQueryParams(category.id)
                    .then(() => {
                        this.service.edit = category;
                        this.service.add = null;
                        this.categories.push(category);
                        this.snackBar.open('The category has been saved successfully');
                    });
            });
    }

    updateCategory(category: Category): void {
        this.processing = true;
        this.process = PROC_UPDATE;
        this.service.updateCategory(category)
            .pipe(finalize(() => this.postProcessing()))
            .subscribe(category => {
                const updated = this.categories.find(c => c.id === category.id);
                this.service.edit = category;
                updated.deserialize(category);
                this.snackBar.open('The category has been updated successfully');
            });
    }

    deleteCategoryFromEdit(category: Category) {
        this.deleteWarningDialog().pipe(flatMap(_ => {
            this.processing = true;
            this.process = PROC_DELETE;
            this.lockDeleteRow = true;
            return this.service.deleteCategory(category);
        }), finalize(() => this.postProcessing())).subscribe(_ => {
            this.closeSidenavEdit();
            this.onCategoryDeleted(category);
        });
    }

    private onCategoryDeleted(category: Category) {
        const index = this.categories.findIndex(c => c.id === category.id);
        this.categories.splice(index, 1);
        this.snackBar.open('The category has been deleted successfully');
    }

    deleteCategoryFromList(category: Category): void {
        this.deleteWarningDialog().pipe(flatMap(_ => {
            this.lockDeleteRow = true;
            this.progressBar.status = true;
            return this.service.deleteCategory(category);
        }), finalize(() => {
            this.onCategoryDeletedFinalize(category);
        })).subscribe(_ => {
            this.onCategoryDeleted(category);
        });
    }

    private onCategoryDeletedFinalize(category: Category) {
        if (category?.id === this.service.edit?.id) {
            this.closeSidenavEdit();
        }
        this.postProcessing();
        this.progressBar.status = false;
    }

    private deleteWarningDialog() {
        return this.dialog.open(WarningDialogComponent, {
            data: {
                title: 'Confirm category deletion',
                body: 'All coupons from the category will be deleted as well',
                action: 'Delete'
            }
        }).afterClosed().pipe(
            first(),
            filter(deleteCategory => deleteCategory));
    }

    private setQueryParams(id: number): Promise<any> {
        return this.router.navigate(
            ['./'],
            {relativeTo: this.activatedRoute, queryParams: {edit: id}});
    }

    private fetchCategory(id: number): Observable<Category> {
        this.openSidenav();
        return this.service
            .getCategory(id)
            .pipe(first());
    }

    closeSidenavEdit() {
        this.closeSidenav().subscribe(_ => {
            this.clearAdd();
            this.clearEdit();
            this.notFound = false;
        });
    }

    private clearEdit() {
        this.service.edit = null;
        this.router.navigate(
            ['./'],
            {relativeTo: this.activatedRoute, queryParams: {edit: null}});
    }

    openSidenavAdd() {
        if (this.service.add) {
            return;
        }
        this.clearEdit();
        this.service.add = new Category();
        this.openSidenav();
        this.notFound = false;
    }

    private clearAdd() {
        this.service.add = null;
    }

    get formMode(): string {
        return !!this.service.add ? ADD_MODE : !!this.service.edit ? EDIT_MODE : null;
    }

    private postProcessing() {
        this.processing = false;
        this.process = null;
        this.lockDeleteRow = false;
    }

    retryAllCategories() {
        this.categories = undefined;
        this.getAllCategories();
    refreshList() {
        this.progressBar.status = true;
        this.getAllCategories().pipe(finalize(() => this.progressBar.status = false))
            .subscribe(_ => this.snackBar.open('The list has been refreshed'));
    }
}
