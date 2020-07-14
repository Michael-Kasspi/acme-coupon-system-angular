import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Coupon} from '../../model/Coupon';
import {ActivatedRoute} from '@angular/router';
import {MatTable} from '@angular/material/table';
import {EndpointService} from '../../endpoint/endpoint.service';
import {CustomerService} from '../services/customer.service';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {finalize} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {WarningDialogComponent} from '../../dialog/warning-dialog/warning-dialog.component';

@Component({
    selector: 'app-customer-coupons',
    templateUrl: './customer-coupons.component.html',
    styleUrls: ['./customer-coupons.component.scss']
})
export class CustomerCouponsComponent implements OnInit, AfterViewInit {

    @ViewChild('customerCouponsTable')
    customerCouponsTable: MatTable<Coupon> = null;

    coupons: Coupon[] = null;
    displayedColumns: string[] = ['imageUrl', 'title', 'description', 'category', 'company', 'remove'];

    constructor(
        public endpoint: EndpointService,
        private activatedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private customerService: CustomerService,
        private progressBar: ManualProgressBarService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
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
        this.dialog.open(WarningDialogComponent, {
            data: {
                title: 'Confirm coupon removal',
                body: 'Warning! this action can\'t be undone.',
                action: 'Remove'
            }
        })
            .afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            this.progressBar.status = true;
            this.customerService.removeCoupon(couponToRemove.id)
                .pipe(finalize(() => this.progressBar.status = false))
                .subscribe(_ => {
                    const index = this.coupons.findIndex(coupon => {
                        return coupon.id === couponToRemove.id;
                    });
                    this.coupons.splice(index, 1);
                    this.customerCouponsTable.renderRows();
                    this.snackBar.open('The coupon has been removed from the collection');
                });
        });

    }
}
