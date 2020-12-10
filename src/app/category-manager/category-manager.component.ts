import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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

    categories: String[] = [];

    constructor() {
    }

    ngOnInit(): void {
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

    editCategory(category: String) {
        this.openSidenav();
    }
}
