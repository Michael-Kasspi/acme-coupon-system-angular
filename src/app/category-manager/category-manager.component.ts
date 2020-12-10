import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryManagerService} from './category-manager.service';
import {Category} from '../model/Category';
import {finalize, first} from 'rxjs/operators';
import {ManualProgressBarService} from '../progress-bar/manual-progress-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

export const ACTIVE_CLASS = 'list-active';

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
        private service: CategoryManagerService,
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
        );
    }

    selectRow(listRow: HTMLLIElement) {
        listRow.tabIndex = -1;
        listRow.focus();
    }

    setActiveRow(listRow: HTMLLIElement) {
        listRow.classList.add(ACTIVE_CLASS);
    }

    removeActiveRow(listRow: HTMLLIElement) {
        listRow.classList.remove(ACTIVE_CLASS);
    }

    openSidenav() {
        this.sidenav.nativeElement.style.width = '50%';
        this.showFab = false;
    }

    closeSidenav() {
        this.sidenav.nativeElement.style.width = '0';
        this.showFab = true;
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
            this.fetchCategory(category.id);
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

    get currentAdd(): Category {
        return this.service.add;
    }

    get currentEdit(): Category {
        return this.service.edit;
    }

    closeSidenavEdit() {
        this.clearAdd();
        this.clearEdit();
        this.closeSidenav();
    }

    private clearEdit() {
        this.service.edit = null;
        this.router.navigate(
            ['./'],
            {relativeTo: this.activatedRoute, queryParams: {edit: null}});
    }

    openSidenavAdd() {
        if (this.currentAdd) {
            return;
        }
        this.clearEdit();
        this.service.add = new Category();
        this.openSidenav();
    }

    private clearAdd() {
        this.service.add = null;
    }
}
