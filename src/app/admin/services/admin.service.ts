import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import {EndpointService} from '../../endpoint/endpoint.service';
import {UserType} from '../../model/UserType';
import {CouponRestService} from '../../coupon/services/interfaces/CouponRestService';
import {Coupon} from '../../model/Coupon';
import {Category} from '../../model/Category';

@Injectable({
    providedIn: 'root'
})
export class AdminService implements CouponRestService{

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    public addCompany(company: any): Observable<any> {
        company.type = UserType.COMPANY;
        return this.client.post<any>(
            `${this.endpoint.url}admin/companies`,
            company,
            {withCredentials: true});
    }

    public updateCompany(company: any): Observable<any> {
        company.type = UserType.COMPANY;
        return this.client.put<any>(
            `${this.endpoint.url}admin/companies`,
            company,
            {withCredentials: true});
    }

    public getAllCompanies(): Observable<any> {
        return this.client.get<any>(
            `${this.endpoint.url}admin/companies`,
            {withCredentials: true}
        );
    }

    public deleteCompany(id: number): Observable<any> {
        return this.client.delete<any>(
            `${this.endpoint.url}admin/companies/${id}`,
            {withCredentials: true});
    }

    /*TODO: implement methods*/

    addCoupon(coupon: Coupon): Observable<Coupon> {
        return undefined;
    }

    deleteCoupon(couponId: number): Observable<any> {
        return undefined;
    }

    deleteImage(couponId: number): Observable<Coupon> {
        return undefined;
    }

    getAllCategories(): Observable<Category[]> {
        return undefined;
    }

    getCoupon(couponId: number): Observable<Coupon> {
        return undefined;
    }

    getCoupons(): Observable<Coupon[]> {
        return undefined;
    }

    updateCoupon(coupon: Coupon): Observable<Coupon> {
        return undefined;
    }

    uploadCouponImage(couponId: number, image: File): Observable<HttpEvent<Coupon>> {
        return undefined;
    }
}
