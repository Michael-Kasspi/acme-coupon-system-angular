import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {CustomerService} from '../services/customer.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerCouponsResolverService implements Resolve<Coupon[]>{

  constructor(private customerService: CustomerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Coupon[]> {
        return this.customerService.getAllCoupons().pipe(catchError(_ => EMPTY));
    }
}
