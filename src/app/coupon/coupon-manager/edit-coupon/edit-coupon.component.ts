import {Component, OnInit, ViewChild} from '@angular/core';
import {Coupon} from '../../../model/Coupon';
import {Category} from '../../../model/Category';
import {CouponFormComponent} from '../../components/coupon-form/coupon-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ManualProgressBarService} from '../../../progress-bar/manual-progress-bar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DiscardDialogComponent} from '../../../dialog/discard-dialog/discard-dialog.component';
import {finalize, tap} from 'rxjs/operators';
import {CouponManagerService} from '../../services/coupon-manager.service';

@Component({
    selector: 'app-edit-coupon',
    templateUrl: './edit-coupon.component.html',
    styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {

    coupon: Coupon = null;
    categories: Category[] = [];
    image: File = null;

    @ViewChild(CouponFormComponent)
    couponFormComponent: CouponFormComponent = null;

    constructor(
        public activatedRoute: ActivatedRoute,
        public progressBar: ManualProgressBarService,
        public snackBar: MatSnackBar,
        public router: Router,
        public dialog: MatDialog,
        public couponManagerService: CouponManagerService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { coupon: Coupon, categories: Category[] }) => {
            this.coupon = data.coupon;
            this.categories = data.categories;
        });
    }

    // noinspection JSUnusedGlobalSymbols
    canDeactivate(): Observable<boolean> | boolean {

        if (!this.couponFormComponent || this.couponFormComponent.couponForm.pristine) {
            return true;
        }
        this.progressBar.status = false;
        return this.dialog
            .open(DiscardDialogComponent)
            .afterClosed()
            .pipe(tap(value => this.progressBar.status = value));
    }

    updateCoupon(coupon: Coupon) {
        this.couponFormComponent.processing = true;
        this.couponManagerService.updateCoupon(coupon)
            .pipe(finalize(() => this.couponFormComponent.processing = false))
            .subscribe((coupon: Coupon) => {
                this.coupon = coupon;
                this.couponFormComponent.reset();
            });
    }

    uploadImage(image: File) {
        this.couponManagerService
            .uploadImage(this.coupon, image)
            .subscribe(coupon => {
                this.coupon.imageUrl = coupon.imageUrl;
            });
    }

    deleteCoupon(coupon: Coupon) {
        this.couponManagerService.deleteCoupon(coupon).subscribe(value => {
            this.couponFormComponent.reset();
            this.router.navigate(['../../all'], {relativeTo: this.activatedRoute});
        });
    }

    deleteImage(coupon: Coupon) {
        this.couponManagerService.deleteImage(coupon.id).subscribe(coupon => {
            this.coupon.imageUrl = coupon.imageUrl;
        });
    }
}
