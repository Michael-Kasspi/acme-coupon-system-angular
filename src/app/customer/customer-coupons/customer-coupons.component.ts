import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Coupon} from '../../model/Coupon';
import {ActivatedRoute} from '@angular/router';
import {MatTable} from '@angular/material/table';
import {EndpointService} from '../../endpoint/endpoint.service';
import {CustomerService} from '../services/customer.service';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {finalize} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-customer-coupons',
    templateUrl: './customer-coupons.component.html',
    styleUrls: ['./customer-coupons.component.scss']
})
export class CustomerCouponsComponent implements OnInit, AfterViewInit {

    @ViewChild('customerCouponsTable')
    customerCouponsTable: MatTable<Coupon> = null;

    coupons: Coupon[] = null;
    displayedColumns: string[] = ['imageUrl', 'title', 'description', 'company', 'remove'];

    constructor(
        public activatedRoute: ActivatedRoute,
        public endpoint: EndpointService,
        public changeDetectorRef: ChangeDetectorRef,
        public customerService: CustomerService,
        public progressBar: ManualProgressBarService,
        public snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.activatedRoute.data.subscribe((data: { coupons: Coupon[] }) => {
            this.coupons = data.coupons;
            this.customerCouponsTable.renderRows();
            this.changeDetectorRef.detectChanges();
        });
    }

    removeCoupon(couponToRemove: Coupon) {
        this.progressBar.status = true;
        this.customerService.removeCoupon(couponToRemove.id)
            .pipe(finalize(() => this.progressBar.status = false))
            .subscribe(_ => {
                const index = this.coupons.findIndex(coupon => {
                    return coupon.id === couponToRemove.id;
                });
                this.coupons.splice(index, 1);
                this.customerCouponsTable.renderRows();
                this.snackBar.open('The coupon has been removed from the collection')
            });
    }
}
