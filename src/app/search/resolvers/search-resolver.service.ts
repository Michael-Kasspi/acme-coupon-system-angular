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
        const queryParamMap = route.queryParamMap;
        const query = queryParamMap.get('query');

        if (!query) {
            return EMPTY;
        }

        let httpParams = new HttpParams();
        queryParamMap.keys.map(key => {
             httpParams = httpParams.append(key, queryParamMap.get(key));
        });

        return this.searchService.searchCoupons(httpParams).pipe(catchError(err => EMPTY));
    }
}
