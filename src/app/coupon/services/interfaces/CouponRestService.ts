import {Observable} from 'rxjs';
import {Coupon} from '../../../model/Coupon';
import {Category} from '../../../model/Category';
import {HttpEvent} from '@angular/common/http';

export interface CouponRestService {

    deleteCoupon(couponId: number): Observable<any>;

    addCoupon(coupon: Coupon): Observable<Coupon>;

    updateCoupon(coupon: Coupon): Observable<Coupon>;

    uploadCouponImage(couponId: number, image: File): Observable<HttpEvent<Coupon>>;

    getAllCategories(): Observable<Category[]>

    getCoupon(couponId: number): Observable<Coupon>;

    getCoupons(): Observable<Coupon[]>;

    deleteCouponImage(couponId: number): Observable<Coupon>;
}
