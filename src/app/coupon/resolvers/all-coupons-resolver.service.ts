import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {CouponManagerService} from '../services/coupon-manager.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllCouponsResolverService implements Resolve<Coupon[]>{

  constructor(private couponManagerService: CouponManagerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Coupon[]> {
        return this.couponManagerService.getAllCoupons().pipe(catchError(err => EMPTY));
    }
}
