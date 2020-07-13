import {Component, Input, OnInit} from '@angular/core';
import {Coupon} from '../../../model/Coupon';

@Component({
    selector: 'app-coupon-grid',
    templateUrl: './coupon-grid.component.html',
    styleUrls: ['./coupon-grid.component.scss']
})
export class CouponGridComponent implements OnInit {

    @Input()
    public coupons: Coupon[] = null;

    constructor() {
    }

    ngOnInit(): void {
    }

}
