import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {EMPTY, Observable} from 'rxjs';
import {CompanyService} from '../services/company.service';
import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class CompanyCouponResolverService implements Resolve<Coupon> {

    constructor(
        private companyService: CompanyService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Coupon> {
        const id = +route.paramMap.get('id');
        if (isNaN(id) || id === 0) {
            this.snackBar.open('The id of the coupon is invalid');
            this.navigateToAllCoupons();
            return EMPTY;
        }
        return this.companyService.getCoupon(id).pipe(catchError(err => {
            this.navigateToAllCoupons();
            return EMPTY;
        }));
    }

    private navigateToAllCoupons() {
        this.router.navigate(['/dashboard/company/coupons/all']);
    }
}
