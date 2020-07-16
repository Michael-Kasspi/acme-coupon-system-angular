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
        if (!couponId || isNaN(couponId)) {
            throw new Error('Unable to add coupon to cart without Id')
        }
        return this.client.post<any>(
            `${this.endpoint.url}customer/cart/${couponId}`,
            null,
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    getCartCoupons(): Observable<any> {
        return this.client.get<any>(
            `${this.endpoint.url}customer/cart/`,
            {withCredentials: true}
        ).pipe(map((coupons: any[]) => coupons.map(coupon => new Coupon(coupon))));
    }

    removeCouponFromCart(couponId: number): Observable<any> {
        if (!couponId || isNaN(couponId)) {
            throw new Error('Unable to remove coupon to cart without Id')
        }
        return this.client.delete<any>(
            `${this.endpoint.url}customer/cart/${couponId}`,
            {withCredentials: true}
        );
    }

    purchaseCoupons(coupons: Coupon[]): Observable<Account> {
        if (!coupons) {
            throw new Error('Unable to purchase coupons without coupons')
        }
        let couponsSerialized = coupons.map(coupon => coupon.serialize());
        return this.client.post(
            `${this.endpoint.url}customer/coupons/`,
            couponsSerialized,
            {withCredentials: true}
        ).pipe(
            map(account => new Account(account))
        );
    }

    purchaseCredits(amount: number): Observable<Account> {
        if (!amount || isNaN(amount)) {
            throw new Error('Unable to purchase credits without credits');
        }
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
        if (!id || isNaN(id)) {
            throw new Error('Unable to remove coupon without Id')
        }
        return this.client.delete(
            `${this.endpoint.url}customer/coupons/${id}`,
            {withCredentials: true}
        );
    }
}
