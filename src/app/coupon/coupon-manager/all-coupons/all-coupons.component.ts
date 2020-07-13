import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Coupon} from '../../../model/Coupon';
import {EndpointService} from '../../../endpoint/endpoint.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {CouponManagerService} from '../../services/coupon-manager.service';

@Component({
    selector: 'app-all-coupons',
    templateUrl: './all-coupons.component.html',
    styleUrls: ['./all-coupons.component.scss']
})
export class AllCouponsComponent implements OnInit {

    private readonly NO_SUCH_COUPON: number = -1;

    @ViewChild('couponsTable')
    couponsTable: MatTable<Coupon> = null;

    coupons: Coupon[] = null;
    displayedColumns: string[] = [
        'imageUrl',
        'title',
        'price',
        'amount',
        'category',
        'startDate',
        'endDate',
        'view',
        'edit',
        'delete',
    ];

    constructor(
        public endpoint: EndpointService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public couponManagerService: CouponManagerService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { coupons: Coupon[] }) => {
            this.coupons = data.coupons;
        });
    }

    editCoupon(coupon: Coupon) {
        this.router.navigate([`../edit/${coupon.id}`], {relativeTo: this.activatedRoute});
    }

    viewCouponPage(coupon: Coupon): void {
        this.router.navigate([`/coupons/page/${coupon.id}`]);
    }

    deleteCoupon(coupon: Coupon) {
        const index = this.coupons.findIndex(couponFromArr => coupon.id === couponFromArr.id);
        if (index === this.NO_SUCH_COUPON) {
            this.snackBar.open('Unable to remove the coupon, the coupon is not present in the collection');
            return;
        }
        this.couponManagerService.deleteCoupon(coupon).subscribe(success => {
            this.coupons.splice(index, 1);
            this.couponsTable.renderRows();
        });
    }
}
