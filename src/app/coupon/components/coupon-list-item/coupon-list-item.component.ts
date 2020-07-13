import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Coupon} from '../../../model/Coupon';
import {CouponComponentService} from '../../services/coupon-component.service';

@Component({
    selector: 'app-coupon-list-item',
    templateUrl: './coupon-list-item.component.html',
    styleUrls: ['./coupon-list-item.component.scss'],
    providers: [CouponComponentService]
})
export class CouponListItemComponent implements OnInit, OnDestroy {

    @Input()
    coupon: Coupon = null;

    constructor(public couponService: CouponComponentService) {
    }

    ngOnInit(): void {
        this.couponService.coupon = this.coupon;
        this.couponService.onInit();
    }

    ngOnDestroy(): void {
        this.couponService.onDestroy();
    }

}
