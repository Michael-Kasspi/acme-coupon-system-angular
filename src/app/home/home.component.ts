import {Component, OnInit} from '@angular/core';
import {Coupon} from '../model/Coupon';
import {TitleService} from '../title/title.service';
import {ActivatedRoute} from '@angular/router';
import {CouponService} from '../coupon/services/coupon.service';
import {finalize} from 'rxjs/operators';
import {ManualProgressBarService} from '../progress-bar/manual-progress-bar.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public coupons: Coupon[] = null;
    public reloading: boolean = false;

    constructor(
        private titleService: TitleService,
        private activatedRoute: ActivatedRoute,
        private couponService: CouponService,
        private progressBar: ManualProgressBarService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Home');
        this.activatedRoute.data.subscribe((data: { coupons: Coupon[] }) => {
            this.coupons = data.coupons;
        });
    }

    public reloadCoupons(): void {
        this.progressBar.status = true;
        this.reloading = true;
        this.couponService.getAllCoupons()
            .pipe(finalize(() => {
                this.progressBar.status = false;
                this.reloading = false;
            }))
            .subscribe((coupons: Coupon[]) => this.coupons = coupons);
    }

}
