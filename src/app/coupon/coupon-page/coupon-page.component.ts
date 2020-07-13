import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Coupon} from '../../model/Coupon';
import {CouponService} from '../services/coupon.service';
import {Subscription} from 'rxjs';
import {CouponDetailsComponent} from '../components/coupon-details/coupon-details.component';

@Component({
    selector: 'app-coupon-page',
    templateUrl: './coupon-page.component.html',
    styleUrls: ['./coupon-page.component.scss']
})
export class CouponPageComponent implements OnInit, OnDestroy {

    @ViewChild('details')
    top: ElementRef = null;

    @ViewChild(CouponDetailsComponent)
    details: CouponDetailsComponent = null;

    public coupon: Coupon = null;
    public couponsOnError: Coupon[] = null;
    public couponsByCategory: Coupon[] = null;
    public couponsByCompany: Coupon[] = null;
    private resolver$: Subscription = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private couponService: CouponService
    ) {
    }

    ngOnInit(): void {
        this.resolver$ = this.activatedRoute.data.subscribe((data: { coupon: Coupon }) => {
            this.handle(data.coupon);
        });
    }

    ngOnDestroy(): void {
        this.resolver$.unsubscribe();
    }

    public get companyName() {
        const companyName = this.coupon?.company?.name;
        return CouponPageComponent.truncate(companyName, 25) || 'the same company';
    }

    private fetchCouponsByCategory(): void {
        const category = this?.coupon?.category;
        if (category) {
            this.couponService.getCouponsByCategory(category.id)
                .subscribe((coupons: Coupon[]) => {
                    this.removeThisCoupon(coupons);
                    this.couponsByCategory = coupons;
                }, error => this.couponsByCategory = []);
        }
    }

    private fetchCouponsByCompany(): void {
        const company = this?.coupon?.company;
        if (company) {
            this.couponService.getCouponsByCompany(company.id)
                .subscribe((coupons: Coupon[]) => {
                    this.removeThisCoupon(coupons);
                    this.couponsByCompany = coupons;
                }, error => this.couponsByCompany = []);
        }
    }

    private handle(coupon: Coupon): void {
        if (coupon) {
            this.coupon = coupon;
            this.handleCouponChange();
            this.fetchCouponsByCategory();
            this.fetchCouponsByCompany();
        } else {
            this.fetchCouponsOnError();
        }
    }

    private fetchCouponsOnError(): void {
        this.couponService.getAllCoupons().subscribe((coupons: Coupon[]) => {
            this.couponsOnError = coupons;
        });
    }

    private static truncate(str, n): string {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    private removeThisCoupon(coupons: Coupon[]): void {
        const couponId = this?.coupon?.id;
        const index = coupons.findIndex(coupon => coupon.id === couponId);
        coupons.splice(index, 1);
    }

    private handleCouponChange(): void {
        if (!this.details) {
            return;
        }
        this.couponsByCompany = null;
        this.couponsByCategory = null;
        this.details.coupon = this.coupon;
        this.details.ngOnDestroy();
        this.details.ngOnInit();
    }
}
