import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {EMPTY, Observable} from 'rxjs';
import {CompanyService} from '../services/company.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompanyCouponsResolverService implements Resolve<Coupon[]> {

    constructor(private companyService: CompanyService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Coupon[]> {
        return this.companyService.getCoupons().pipe(catchError(err => EMPTY));
    }
}
