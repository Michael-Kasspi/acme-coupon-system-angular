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
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountDetailsService} from '../../account/services/account-details.service';


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

    displayedColumns: string[] = ['imageUrl', 'title', 'company', 'price', 'inStock'];
    purchasing: boolean = false;

    allInStock: boolean = true;

    constructor(
        public endpoint: EndpointService,
        private titleService: TitleService,
        private cartService: CartService,
        private activatedRoute: ActivatedRoute,
        private progressBarService: ManualProgressBarService,
        private router: Router,
        private snackBar: MatSnackBar,
        private accountDetailsService: AccountDetailsService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Checkout');
        this.fetchCoupons();
        this.fetchAccount();
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
            .subscribe((account: Account) => {
                this.accountDetailsService.account = account;
                this.snackBar.open('The coupons have been purchased successfully');
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

    private fetchAccount() {
        this.activatedRoute.data.subscribe(
            (data: { account: Account }) => {
                this.account = new Account(data.account);
            });
    }

    private fetchCoupons() {
        this.activatedRoute.parent.parent.data.subscribe((data: { coupons: Coupon[] }) => {
            const empty = this.redirectIfEmpty(data);
            if (empty) {
                return;
            }
            this.checkStock(data.coupons);
            this.coupons = data.coupons;
        });
    }

    private redirectIfEmpty(data: { coupons: Coupon[] }): boolean {
        if (data.coupons.length === 0) {
            this.router.navigate(
                ['../items'],
                {relativeTo: this.activatedRoute}
            );
            return true;
        }
        return false;
    }

    private checkStock(coupons: Coupon[]) {
        coupons.forEach(coupons => {
            if (!coupons.isInStock) {
                this.allInStock = false;
            }
        });
    }
}
