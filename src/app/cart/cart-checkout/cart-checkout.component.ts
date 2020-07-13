import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {Coupon} from '../../model/Coupon';
import {Account} from '../../model/Account';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTable} from '@angular/material/table';
import {finalize} from 'rxjs/operators';
import {EndpointService} from '../../endpoint/endpoint.service';
import {TitleService} from '../../title/title.service';
import {CartService} from '../services/cart.service';


@Component({
    selector: 'app-cart-checkout',
    templateUrl: './cart-checkout.component.html',
    styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit, AfterViewInit {

    @ViewChild('checkoutTable')
    checkoutTable: MatTable<Coupon> = null;

    account: Account = null;
    coupons: Coupon[] = null;

    purchased: boolean = false;
    lastTotal: number = 0;

    displayedColumns: string[] = ['imageUrl', 'title', 'company', 'price'];
    purchasing: boolean = false;

    constructor(
        public titleService: TitleService,
        public cartService: CartService,
        public activatedRoute: ActivatedRoute,
        public endpoint: EndpointService,
        public progressBarService: ManualProgressBarService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Cart - Checkout');
        this.activatedRoute.parent.parent.data.subscribe((data: { coupons: Coupon[] }) => {
            if (data.coupons.length === 0) {
                this.router.navigate(
                    ['../items'],
                    {relativeTo: this.activatedRoute}
                );
            }

            this.coupons = data.coupons;
        });
        this.activatedRoute.data.subscribe(
            (data: { account: Account }) => {
                this.account = new Account(data.account);
            });
    }

    ngAfterViewInit(): void {
        this.checkoutTable.renderRows();
    }

    checkout() {
        this.progressBarService.status = true;
        this.purchasing = true;
        this.cartService.checkout$()
            .pipe(finalize(() => {
                this.progressBarService.status = false;
                this.purchasing = false;
            }))
            .subscribe(_ => {
                this.purchased = true;
            });
    }

    get totalAmount(): number {
        if (this.coupons.length === 0) {
            return this.lastTotal;
        }

        return this.lastTotal = this.coupons
            .map(coupon => coupon.price)
            .reduce((acc, curr) => acc + curr);
    }

    get remainingBalance(): number {
        return this.account.credit - this.totalAmount;
    }

    get isEnoughCredits(): boolean {
        return this.remainingBalance < 0;
    }

    get currentBalance(): number {
        return this.account.credit;
    }

}
