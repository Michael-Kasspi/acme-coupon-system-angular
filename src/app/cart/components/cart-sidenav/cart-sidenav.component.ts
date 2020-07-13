import {Component, OnInit} from '@angular/core';
import {Coupon} from '../../../model/Coupon';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'app-cart-sidenav',
    templateUrl: './cart-sidenav.component.html',
    styleUrls: ['./cart-sidenav.component.scss']
})
export class CartSidenavComponent implements OnInit {
    couponsArr: Coupon[] = null;

    constructor(
        public cartService: CartService,
    ) {
    }

    ngOnInit(): void {
        this.cartService
            .getCoupons$()
            .subscribe(coupons => {
                this.couponsArr = coupons;
            });
    }

    get totalAmount(): number {

        if (this.couponsArr) {
            return this.couponsArr
                .map(coupon => coupon.price)
                .reduce((acc, curr) => acc + curr);
        }

        return 0;
    }
}
