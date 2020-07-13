import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Category} from '../../model/Category';
import {CouponManagerService} from '../services/coupon-manager.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AllCategoriesResolverService implements Resolve<Category[]> {

    constructor(private couponManagerService: CouponManagerService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this.couponManagerService
            .getAllCategories()
            .pipe(catchError(err => EMPTY));
    }


}
