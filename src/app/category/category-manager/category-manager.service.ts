import {Injectable} from '@angular/core';
import {CategoryClient} from './category.client.interface';
import {Observable} from 'rxjs';
import {Category} from '../../model/Category';

@Injectable({
    providedIn: 'root'
})
export class CategoryManagerService {

    private _client: CategoryClient = null;
    private _edit: Category = null;
    private _add: Category = null;
    private _category: Category = null;

    constructor() {
    }

    public getAllCategories(): Observable<Category[]> {
        return this._client.getAllCategories();
    }

    public getCategory(id: number): Observable<Category> {
        return this._client.getCategory(id);
    }

    saveCategory(category: Category): Observable<Category> {
        return this._client.addCategory(category);
    }

    updateCategory(category: Category): Observable<Category> {
        return this._client.updateCategory(category);
    }

    deleteCategory(category: Category): Observable<void> {
        return this._client.deleteCategory(category.id);
    }

    set client(value: CategoryClient) {
        this._client = value;
    }

    get edit(): Category {
        return this._edit;
    }

    set edit(value: Category) {
        this._edit = value;
        this._category = value;
    }

    get add(): Category {
        return this._add;
    }

    set add(value: Category) {
        this._add = value;
        this._category = value;
    }

    get category(): Category {
        return this._category;
    }

    set category(value: Category) {
        this._category = value;
        this._add = value;
        this._edit = value;
    }
}
