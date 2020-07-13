import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Coupon} from '../../../model/Coupon';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'app-cart-button',
    templateUrl: './cart-button.component.html',
    styleUrls: ['./cart-button.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CartButtonComponent implements OnInit {

    @Input()
    cartSidenavRef: MatSidenav = null;
    @Input()
    disabled: boolean = false;

    coupons: Coupon[] = null;

    constructor(
        private cartService: CartService,
    ) {
    }

    ngOnInit(): void {
        this.cartService.getCoupons$()
            .subscribe(coupons => {
            this.coupons = coupons;
        });
    }

    get amount(): number | string {
        if (this.coupons) {
            let length = this.coupons.length;
            return length > 0 ? length : '';
        }
        return '';
    }

}
