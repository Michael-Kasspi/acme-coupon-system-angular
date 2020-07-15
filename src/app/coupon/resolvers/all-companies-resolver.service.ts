import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Company} from '../../model/Company';
import {EMPTY, Observable} from 'rxjs';
import {CouponManagerService} from '../services/coupon-manager.service';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AllCompaniesResolverService implements Resolve<Company[]> {

    constructor(private couponManager: CouponManagerService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]> {
        return this.couponManager.getAllCompanies().pipe(catchError(err => EMPTY));
    }

}
