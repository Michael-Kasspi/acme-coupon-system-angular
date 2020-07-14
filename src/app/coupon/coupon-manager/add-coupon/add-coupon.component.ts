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
import {TitleService} from '../../../title/title.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

    coupon: Coupon = null;
    categories: Category[] = [];

    @ViewChild(CouponFormComponent)
    couponFormComponent: CouponFormComponent = null;
    image: File = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private progressBar: ManualProgressBarService,
        private snackBar: MatSnackBar,
        private router: Router,
        private dialog: MatDialog,
        private couponManagerService: CouponManagerService,
        private titleService: TitleService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('New Coupon');
        this.activatedRoute.data.subscribe((data: { categories: Category[] }) => {
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

    addCoupon(coupon: Coupon) {
        if (!coupon) {
            this.snackBar.open('Unable to add coupon, coupon object wasn\'t provided');
            return;
        }
        this.couponFormComponent.processing = true;
        this.couponManagerService.addCoupon(coupon, this.image)
            .pipe(finalize(() => this.couponFormComponent.processing = false))
            .subscribe((coupon: Coupon) => {
                this.coupon = coupon;
                this.couponFormComponent.reset();
                this.navigate(coupon.id);
        })
    }

    private navigate(couponId) {
        this.router.navigate([`../edit/${couponId}`], {relativeTo: this.activatedRoute});
    }

    removeImage() {
        this.image = null;
    }
}
