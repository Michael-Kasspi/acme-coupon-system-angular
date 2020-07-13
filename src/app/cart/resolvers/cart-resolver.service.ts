import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {Coupon} from '../../model/Coupon';
import {CartService} from '../services/cart.service';

@Injectable({
    providedIn: 'root'
})
export class CartResolverService implements Resolve<Coupon[]> {

    constructor(private cartService: CartService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Coupon[]> {
        return this.cartService.getCoupons$()
            .pipe(
                first(),
                catchError(err => EMPTY)
            );
    }
}
