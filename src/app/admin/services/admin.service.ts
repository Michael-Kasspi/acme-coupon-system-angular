import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {EndpointService} from '../../endpoint/endpoint.service';
import {UserType} from '../../model/UserType';
import {CouponRestService} from '../../coupon/services/interfaces/CouponRestService';
import {Coupon} from '../../model/Coupon';
import {Category} from '../../model/Category';
import {map} from 'rxjs/operators';
import {Company} from '../../model/Company';
import {Account} from '../../model/Account';

@Injectable({
    providedIn: 'root'
})
export class AdminService implements CouponRestService {

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    public getAllCompanies(): Observable<Company[]> {
        return this.client.get<Company[]>(
            `${this.endpoint.url}admin/companies`,
            {withCredentials: true}
        ).pipe(map((companies: any[]) => companies.map(company => new Company(company))));
    }

    addCoupon(coupon: Coupon): Observable<Coupon> {
        if (!coupon) {
            return throwError('Unable to add coupon without coupon');
        }
        return this.client.post<Coupon>(
            `${this.endpoint.url}admin/coupons/`,
            coupon.serialize(),
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    deleteCoupon(couponId: number): Observable<any> {
        if (!couponId) {
            throwError('Unable to delete coupon without id');
        }
        return this.client.delete<any>(
            `${this.endpoint.url}admin/coupons/${couponId}`,
            {withCredentials: true}
        );
    }

    deleteCouponImage(couponId: number): Observable<Coupon> {
        if (!couponId) {
            throwError('Unable to delete coupon image without id');
        }
        return this.client.delete<Coupon>(
            `${this.endpoint.url}admin/coupons/${couponId}/images`,
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    getAllCategories(): Observable<Category[]> {
        return this.client.get<Category[]>(
            `${this.endpoint.url}admin/categories`,
            {withCredentials: true}
        ).pipe(map((categories: any[]) => categories.map(category => new Category(category))));
    }

    getCoupon(couponId: number): Observable<Coupon> {
        if (!couponId) {
            throwError('Unable to get coupon without id');
        }
        return this.client.get<Coupon>(
            `${this.endpoint.url}admin/coupons/${couponId}`,
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    getCoupons(): Observable<Coupon[]> {
        return this.client.get<Coupon[]>(
            `${this.endpoint.url}admin/coupons/`,
            {withCredentials: true}
        ).pipe(map((coupons: any[]) => coupons.map(coupon => new Coupon(coupon))));
    }

    updateCoupon(coupon: Coupon): Observable<Coupon> {
        if (!coupon) {
            return throwError('Unable to add coupon without coupon');
        }
        return this.client.put<Coupon>(
            `${this.endpoint.url}admin/coupons/`,
            coupon.serialize(),
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    uploadCouponImage(couponId: number, image: File): Observable<HttpEvent<Coupon>> {
        if (!image) {
            return throwError('Unable to upload coupon image without image');
        }

        if (!couponId) {
            return throwError('Unable to upload coupon image without coupon Id');
        }
        const formData = new FormData();
        formData.append('image', image);

        return this.client.post<Coupon>(
            `${this.endpoint.url}admin/coupons/${couponId}/images`,
            formData,
            {withCredentials: true, reportProgress: true, observe: 'events'}
        );
    }

    getAllAccounts(): Observable<Account[]> {
        return this.client.get<Account[]>(
            `${this.endpoint.url}admin/accounts/`,
            {withCredentials: true}
        ).pipe(map((accounts: any[]) => accounts.map(account => new Account(account))));
    }

    addAccount(account: Account): Observable<Account> {
        if (!account) {
            return throwError('Unable to add account without account');
        }

        return this.client.post<Account>(
            `${this.endpoint.url}admin/accounts/`,
            account.serialize,
            {withCredentials: true}
        ).pipe(map(account => new Account(account)));
    }

    getAccount(id: number): Observable<Account> {
        if (!id || isNaN(id)) {
            throw new Error('Unable to get account without Id');
        }

        return this.client.get<Account>(
            `${this.endpoint.url}admin/accounts/${id}`,
            {withCredentials: true}
        ).pipe(map(account => new Account(account)));
    }

    updateAccount(account: Account): Observable<Account> {
        if (!account || !account.id) {
            throw new Error('Unable to update account without Account or Id');
        }
        return this.client.put<Account>(
            `${this.endpoint.url}admin/accounts/`,
            account.serialize,
            {withCredentials: true}
        ).pipe(map(account => new Account(account)));
    }

    deleteAccount(id: number): Observable<any> {
        if (!id || isNaN(id)) {
            throw new Error('Unable to delete account without Id');
        }
        return this.client.delete<Account>(
            `${this.endpoint.url}admin/accounts/${id}`,
            {withCredentials: true}
        ).pipe(map(account => new Account(account)));
    }
}
