import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndpointService} from '../../endpoint/endpoint.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Coupon} from '../../model/Coupon';

@Injectable({
    providedIn: 'root'
})
export class CouponService {

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    getCoupon(id: number): Observable<any> {
        return this.client.get<any>(`${this.endpoint.url}public/coupons/${id}`);
    }

    getAllCoupons(): Observable<any> {
        return this.client.get<any>(`${this.endpoint.url}public/coupons/`)
            .pipe(map((coupons: []) => coupons.map(coupon => new Coupon(coupon))));
    }

    getCouponsByCategory(id: number) {
        return this.client.get<any>(`${this.endpoint.url}public/coupons/categories/${id}`)
            .pipe(map((coupons: []) => coupons.map(coupon => new Coupon(coupon))));
    }

    getCouponsByCompany(id: number) {
        return this.client.get<any>(`${this.endpoint.url}public/coupons/companies/${id}`)
            .pipe(map((coupons: []) => coupons.map(coupon => new Coupon(coupon))));
    }
}
