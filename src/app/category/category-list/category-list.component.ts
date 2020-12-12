import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {ACTIVE_CLASS} from '../category-manager/category-manager.component';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

    @Output('edit')
    editEvent = new EventEmitter<Category>();

    @Output('select')
    selectEvent = new EventEmitter<Category>();

    @Output('selectOrEdit')
    selectOrEditEvent = new EventEmitter<Category>();

    @Output('delete')
    deleteEvent = new EventEmitter<Category>();

    @Output('list')
    listEvent = new EventEmitter<Category>();

    @Input()
    categories: Category[] = undefined;

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

    edit(category: Category) {
        this.editEvent.emit(category);
        this.selectOrEditEvent.emit(category);
    }

    select(category: Category) {
        this.selectEvent.emit(category);
        this.selectOrEditEvent.emit(category);
    }

    delete(category: Category) {
        this.deleteEvent.emit(category);
    }

    list(category: Category) {
        this.listEvent.emit(category);
    }
}
