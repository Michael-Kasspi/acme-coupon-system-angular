import {Component, OnInit} from '@angular/core';
import {Coupon} from '../model/Coupon';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    coupons: Coupon[] = null;

    constructor(public activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: {coupons: Coupon[]}) => {
            this.coupons = data.coupons;
        })
    }

}
