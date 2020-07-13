import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Coupon} from '../../../model/Coupon';
import {CouponComponentService} from '../../services/coupon-component.service';

@Component({
    selector: 'app-coupon-details',
    templateUrl: './coupon-details.component.html',
    styleUrls: ['./coupon-details.component.scss'],
    providers: [CouponComponentService]
})
export class CouponDetailsComponent implements OnInit, OnDestroy, AfterViewChecked {

    @ViewChild('description')
    description: ElementRef = null;

    @Input()
    public coupon: Coupon = null;
    public showMore: boolean = false;
    public overflow: boolean = false;

    constructor(
        public couponService: CouponComponentService,
        private cdRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.couponService.coupon = this.coupon;
        this.couponService.onInit();
    }

    ngOnDestroy(): void {
        this.couponService.onDestroy();
    }

    ngAfterViewChecked(): void {
        this.detectOverflow();
    }

    private detectOverflow() {
        if (!this.description) {
            return;
        }
        const scrollHeight = this.description.nativeElement.scrollHeight;
        const offsetHeight = this.description.nativeElement.offsetHeight;
        this.overflow = offsetHeight < scrollHeight;
        this.cdRef.detectChanges();
    }
}
