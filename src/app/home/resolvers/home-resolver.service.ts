import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Coupon} from "../../model/Coupon";
import {catchError, map} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {CouponService} from "../../coupon/services/coupon.service";

@Injectable({
    providedIn: 'root'
})
export class HomeResolverService implements Resolve<Coupon[]> {

    constructor(private couponService: CouponService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.couponService.getAllCoupons().pipe(catchError(err => EMPTY));
    }
}
