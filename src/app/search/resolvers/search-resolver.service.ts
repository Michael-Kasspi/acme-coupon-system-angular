import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {EMPTY, Observable} from 'rxjs';
import {SearchService} from '../services/search.service';
import {HttpParams} from '@angular/common/http';
import {ResultPage} from '../../model/ResultPage';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchResolverService implements Resolve<ResultPage<Coupon>> {

    constructor(private searchService: SearchService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResultPage<Coupon>> {
        const query = route.queryParamMap.get('query');
        if (!query) {
            return EMPTY;
        }
        return this.searchService.searchCoupons(route.queryParams as HttpParams).pipe(catchError(err => EMPTY));
    }
}
