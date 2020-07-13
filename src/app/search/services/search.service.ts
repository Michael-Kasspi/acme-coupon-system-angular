import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Coupon} from '../../model/Coupon';
import {ResultPage} from '../../model/ResultPage';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EndpointService} from '../../endpoint/endpoint.service';
import {map} from 'rxjs/operators';
import {Company} from '../../model/Company';
import {Category} from '../../model/Category';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    public searchCoupons(params: HttpParams): Observable<ResultPage<Coupon>> {
        return this.client.get<any>(
            `${this.endpoint.url}search/coupons`,
            {params: params})
            .pipe(map(result => {
                const resultPage = new ResultPage<Coupon>(result);
                resultPage.content = resultPage.content.map(coupon => new Coupon(coupon));
                return resultPage;
            }));
    }

    public getAllCompanies(): Observable<Company[]> {
        return this.client.get<any>(
            `${this.endpoint.url}public/companies`)
            .pipe(map((companies: any[]) => companies.map(company => new Company(company))));
    }

    public getAllCategories(): Observable<Category[]> {
        return this.client.get<any>(
            `${this.endpoint.url}public/categories`)
            .pipe(map((categories: any[]) => categories.map(category => new Category(category))));
    }
}
