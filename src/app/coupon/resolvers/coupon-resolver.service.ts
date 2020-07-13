import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Coupon} from '../../model/Coupon';
import {CouponService} from '../services/coupon.service';

@Injectable({
    providedIn: 'root'
})
export class CouponResolverService implements Resolve<Coupon> {

    constructor(
        private couponService: CouponService,
        private snackBar: MatSnackBar
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let id = +route.paramMap.get('id');
        if (isNaN(id) || id === 0) {
            this.snackBar.open('Invalid coupon id');
            return EMPTY;
        }

        return this.couponService.getCoupon(id).pipe(
            map(coupon => new Coupon(coupon)),
            catchError(err => {
                return EMPTY;
            })
        );
    }
}
