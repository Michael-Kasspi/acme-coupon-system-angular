import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SearchService} from '../services/search.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from '../../model/Company';

@Injectable({
    providedIn: 'root'
})
export class SearchCompanyResolverService implements Resolve<Company[]> {

    constructor(private searchService: SearchService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]> {
        return this.searchService.getAllCompanies().pipe(catchError(err => EMPTY));
    }
}
