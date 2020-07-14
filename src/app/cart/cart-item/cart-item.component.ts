import {Component, OnInit} from '@angular/core';
import {TitleService} from '../../title/title.service';
import {ActivatedRoute} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {EndpointService} from '../../endpoint/endpoint.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

    coupons: Coupon[];

    constructor(
        public titleService: TitleService,
        public activatedRoute: ActivatedRoute,
        public endpoint: EndpointService,
        public snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Cart');
        this.activatedRoute.parent.parent.data.subscribe((data: { coupons: Coupon[] }) => {
            this.coupons = data.coupons;
        });
    }

}
