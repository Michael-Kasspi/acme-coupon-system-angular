import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {EMPTY, Observable} from 'rxjs';
import {CompanyService} from '../services/company.service';
import {catchError, tap} from 'rxjs/operators';
import {Category} from '../../model/Category';

@Injectable({
    providedIn: 'root'
})
export class CompanyCategoriesResolverService implements Resolve<Category[]> {

    constructor(private companyService: CompanyService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this.companyService.getAllCategories().pipe(catchError(err => EMPTY));
    }
}
