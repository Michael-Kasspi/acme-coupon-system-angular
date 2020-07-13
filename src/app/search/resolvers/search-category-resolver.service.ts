import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Category} from '../../model/Category';
import {EMPTY, Observable} from 'rxjs';
import {SearchService} from '../services/search.service';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchCategoryResolverService implements Resolve<Category[]> {

    constructor(private searchService: SearchService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this.searchService.getAllCategories().pipe(catchError(err => EMPTY));
    }

}
