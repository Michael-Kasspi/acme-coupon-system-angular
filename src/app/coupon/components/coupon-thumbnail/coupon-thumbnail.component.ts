import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CouponComponentService} from '../../services/coupon-component.service';
import {Coupon} from '../../../model/Coupon';

@Component({
    selector: 'app-coupon-thumbnail',
    templateUrl: './coupon-thumbnail.component.html',
    styleUrls: ['./coupon-thumbnail.component.scss'],
    providers: [CouponComponentService]
})
export class CouponThumbnailComponent implements OnInit, OnDestroy {

    @Input()
    public coupon: Coupon = null;

    constructor(
        public couponService: CouponComponentService,
    ) {
    }

    ngOnInit(): void {
        this.couponService.coupon = this.coupon;
        this.couponService.onInit();
    }

    ngOnDestroy(): void {
        this.couponService.onDestroy();
    }

}
