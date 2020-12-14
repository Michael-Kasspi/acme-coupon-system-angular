import {Category} from '../../model/Category';
import {Observable} from 'rxjs';

export interface CategoryClient {

    getAllCategories(): Observable<Category[]>;

    getCategory(id: number): Observable<Category>;

    addCategory(category: Category): Observable<Category>;

    updateCategory(category: Category): Observable<Category>;

    deleteCategory(id: number): Observable<void>;

    isCategoryNameExists(name: String): Observable<boolean>
}
