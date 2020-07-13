import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {EndpointService} from '../../endpoint/endpoint.service';
import {Coupon} from '../../model/Coupon';
import {Account} from '../../model/Account';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    addCouponToCart(couponId: number): Observable<Coupon> {
        return this.client.post<any>(
            `${this.endpoint.url}customer/cart/${couponId}`,
            null,
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)))
    }

    addCouponToWishlist(couponId: number): Observable<any> {
        return this.client.post<any>(
            `${this.endpoint.url}customer/whishlist/${couponId}`,
            null,
            {withCredentials: true}
        );
    }

    getCartCoupons(): Observable<any> {
        return this.client.get<any>(
            `${this.endpoint.url}customer/cart/`,
            {withCredentials: true}
        ).pipe(map((coupons: any[]) => coupons.map(coupon => new Coupon(coupon))));
    }

    removeCouponFromCart(couponId: number): Observable<any> {
        return this.client.delete<any>(
            `${this.endpoint.url}customer/cart/${couponId}`,
            {withCredentials: true}
        );
    }

    purchaseCoupons(coupons: Coupon[]): Observable<Coupon[]> {
        let couponsSerialized = coupons.map(coupon => coupon.serialize());
        return this.client.post(
            `${this.endpoint.url}customer/coupons/`,
            couponsSerialized,
            {withCredentials: true}
        ).pipe(
            map((coupons: any[]) => coupons.map(coupon => new Coupon(coupon)))
        );
    }

    purchaseCredits(amount: number): Observable<Account> {
        let params = new HttpParams().set('amount', amount + '');

        return this.client.post<Account>(
            `${this.endpoint.url}customer/credits/`,
            null,
            {
                withCredentials: true,
                params: params
            }
        ).pipe(map(account => new Account(account)));
    }

    getAllCoupons(): Observable<Coupon[]> {
        return this.client.get<Coupon[]>(
            `${this.endpoint.url}customer/coupons/`,
            {withCredentials: true}
        ).pipe(map((coupons: any[]) => coupons.map(coupon => new Coupon(coupon))));
    }

    removeCoupon(id: number): Observable<any> {
        return this.client.delete(
            `${this.endpoint.url}customer/coupons/${id}`,
            {withCredentials: true}
        );
    }
}
