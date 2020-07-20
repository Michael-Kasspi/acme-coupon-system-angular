import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {EndpointService} from '../../endpoint/endpoint.service';
import {Company} from '../../model/Company';
import {map} from 'rxjs/operators';
import {Coupon} from '../../model/Coupon';
import {Category} from '../../model/Category';
import {CouponRestService} from '../../coupon/services/interfaces/CouponRestService';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompanyService implements CouponRestService {

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    getCompany(): Observable<Company> {
        return this.client.get<Company>(
            `${this.endpoint.url}company/`,
            {withCredentials: true}
        ).pipe(map(company => new Company(company)));
    }

    getCoupons(): Observable<Coupon[]> {
        return this.client.get<Coupon[]>(
            `${this.endpoint.url}company/coupons/`,
            {withCredentials: true}
        ).pipe(map((coupons: any[]) => coupons.map(coupon => new Coupon(coupon))));
    }

    deleteCoupon(couponId: number): Observable<any> {
        if (!couponId) {
            throw new Error('Unable to delete coupon without id');
        }
        return this.client.delete<any>(
            `${this.endpoint.url}company/coupons/${couponId}`,
            {withCredentials: true}
        );
    }

    getCoupon(couponId: number): Observable<Coupon> {
        if (!couponId) {
            throw new Error('Unable to get coupon without id');
        }
        return this.client.get<Coupon>(
            `${this.endpoint.url}company/coupons/${couponId}`,
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    getAllCategories(): Observable<Category[]> {
        return this.client.get<Category[]>(
            `${this.endpoint.url}company/coupons/categories`,
            {withCredentials: true}
        ).pipe(map((categories: any[]) => categories.map(category => new Category(category))));
    }

    addCoupon(coupon: Coupon): Observable<Coupon> {
        if (!coupon) {
            throw new Error('Unable to add coupon without coupon');
        }
        return this.client.post<Coupon>(
            `${this.endpoint.url}company/coupons/`,
            coupon.serialize(),
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    updateCoupon(coupon: Coupon): Observable<Coupon> {
        if (!coupon) {
            throw new Error('Unable to add coupon without coupon');
        }
        return this.client.put<Coupon>(
            `${this.endpoint.url}company/coupons/`,
            coupon.serialize(),
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    uploadCouponImage(couponId: number, image: File): Observable<HttpEvent<Coupon>> {
        if (!image) {
            throw new Error('Unable to upload coupon image without image');
        }
        const formData = new FormData();
        formData.append('image', image);

        return this.client.post<Coupon>(
            `${this.endpoint.url}company/coupons/${couponId}/images`,
            formData,
            {withCredentials: true, reportProgress: true, observe: 'events'}
        );
    }

    deleteCouponImage(couponId: number): Observable<Coupon> {
        if (!couponId) {
            throw new Error('Unable to delete coupon image without id');
        }
        return this.client.delete<Coupon>(
            `${this.endpoint.url}company/coupons/${couponId}/images`,
            {withCredentials: true}
        ).pipe(map(coupon => new Coupon(coupon)));
    }

    updateCompany(company: Company): Observable<Company> {
        if (!company) {
            throw new Error('Unable to update company without company');
        }
        return this.client.put<Company>(
            `${this.endpoint.url}company/`,
            company.serialize,
            {withCredentials: true}
        ).pipe(map(company => new Company(company)));
    }

    uploadCompanyLogo(image: File): Observable<HttpEvent<Company>> {
        if (!image) {
            throw new Error('Unable to upload company logo without image');
        }
        const formData = new FormData();
        formData.append('image', image);

        return this.client.post<Company>(
            `${this.endpoint.url}company/logo/`,
            formData,
            {withCredentials: true, reportProgress: true, observe: 'events'}
        );
    }

    deleteCompanyLogo() {
        return this.client.delete<Company>(
            `${this.endpoint.url}company/logo/`,
            {withCredentials: true}
        ).pipe(map(company => new Company(company)));
    }
}
