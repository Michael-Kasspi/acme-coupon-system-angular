import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryManagerService} from './category-manager.service';
import {Category} from '../model/Category';
import {finalize, first} from 'rxjs/operators';
import {ManualProgressBarService} from '../progress-bar/manual-progress-bar.service';
import {ActivatedRoute, Router} from '@angular/router';

export const ACTIVE_CLASS = 'list-active';

@Component({
    selector: 'app-category-manager',
    templateUrl: './category-manager.component.html',
    styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {

    @ViewChild('sidenav')
    sidenav: ElementRef = null;

    showFab: boolean = true;

    categories: Category[] = null;

    constructor(
        private service: CategoryManagerService,
        private progressBar: ManualProgressBarService,
        private route: ActivatedRoute,
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
            .subscribe(categories => this.categories = categories);
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
        if (this.categories) {
            this.service.edit = category;
            this.router.navigate(
                ['./'],
                {relativeTo: this.route, queryParams: {edit: category.id}})
                .then(() => this.openSidenav());
            return;
        }
        this.progressBar.status = true;
        this.service
            .getCategory(category.id)
            .pipe(
                first(),
                finalize(() => {
                    this.progressBar.status = false;
                    this.openSidenav();
                }))
            .subscribe(console.log);
    }

    get currentEdit(): Category {
        return this.service.edit;
    }

    closeSidenavEdit() {
        this.service.edit = null;
        this.router.navigate(
            ['./'],
            {relativeTo: this.route, queryParams: {edit: null}});
        this.closeSidenav();
    }

    openSidenavEdit() {
        /* TODO: implement resolver */
    }
}
