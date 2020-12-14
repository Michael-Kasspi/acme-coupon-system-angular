import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {animate, style, transition, trigger} from '@angular/animations';

export const ACTIVE_CLASS = 'list-active';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    animations: [trigger('listMod', [
        transition(':enter', [
            style({height: 0, opacity: 0}),
            animate('0.4s ease', style({
                height: '48px',
                opacity: 1
            }))
        ]),
        transition(':leave', [
            style({
                opacity: 1,
            }),
            animate('0.3s ease-out', style({
                opacity: 0,
                height: 0
            }))
        ])
    ])]
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

    @Input()
    lockRow: number = undefined;

    @Input()
    locked: boolean = false;

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

    edit(category: Category, lockRow: number) {
        if (!category.id) {
            return;
        }
        this.lockRow = lockRow;
        this.editEvent.emit(category);
        this.selectOrEditEvent.emit(category);
    }

    select(category: Category) {
        this.selectEvent.emit(category);
        this.selectOrEditEvent.emit(category);
    }

    delete(category: Category, row: number) {
        this.lockRow = row;
        this.deleteEvent.emit(category);
    }

    list(category: Category) {
        this.listEvent.emit(category);
    }
}
