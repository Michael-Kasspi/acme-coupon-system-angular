import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryManagerService} from './category-manager.service';
import {Category} from '../../model/Category';
import {delay, finalize, first} from 'rxjs/operators';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ADD_MODE, EDIT_MODE} from '../category-form/category-form.component';

export const ACTIVE_CLASS = 'list-active';
export const SIDE_NAV_WIDTH = '50%';
export const SIDE_NAV_TRANSITION_MS = 500;

@Component({
    selector: 'app-category-manager',
    templateUrl: './category-manager.component.html',
    styleUrls: ['./category-manager.component.scss'],
})
export class CategoryManagerComponent implements OnInit {

    @ViewChild('sidenav')
    sidenav: ElementRef = null;

    showFab: boolean = true;

    categories: Category[] = undefined;

    constructor(
        public service: CategoryManagerService,
        private progressBar: ManualProgressBarService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getAllCategories();
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
                    this.fetchCategory(id)
                        .subscribe(category => this.service.edit = category);
                }
            }
        });
    }

    openSidenav() {
        this.sidenav.nativeElement.style.width = SIDE_NAV_WIDTH;
        this.showFab = false;
    }

    closeSidenav(): Observable<any> {
        return new Observable(consumer => {
            this.sidenav.nativeElement.style.transition = `${SIDE_NAV_TRANSITION_MS}ms`;
            this.sidenav.nativeElement.style.width = '0';
            this.showFab = true;
            consumer.next();
        }).pipe(first(), delay(SIDE_NAV_TRANSITION_MS));

    }

    editCategory(category: Category) {
        this.service.add = null;
        if (this.categories) {
            this.service.edit = category;
            this.router.navigate(
                ['./'],
                {relativeTo: this.activatedRoute, queryParams: {edit: category.id}})
                .then(() => this.openSidenav());
        } else {
            this.fetchCategory(category.id).subscribe(category => this.service.edit = category);
        }
    }

    private fetchCategory(id: number): Observable<Category> {
        this.progressBar.status = true;
        return this.service
            .getCategory(id)
            .pipe(
                first(),
                finalize(() => {
                    this.progressBar.status = false;
                    this.openSidenav();
                }));
    }

    closeSidenavEdit() {
        this.closeSidenav().subscribe(_ => {
            this.clearAdd();
            this.clearEdit();
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
    }

    private clearAdd() {
        this.service.add = null;
    }

    get formMode(): string {
        return !!this.service.add ? ADD_MODE : !!this.service.edit ? EDIT_MODE : null;
    }
}
