import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SessionService} from '../../../auth/session/session.service';
import {UserType} from '../../../model/UserType';
import {CartService} from '../../../cart/services/cart.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input()
    public sidenav: MatSidenav = null;

    @Input()
    public cart: MatSidenav = null;

    public showCartButton: boolean = false;
    public loggedIn: boolean = false;

    constructor(
        public sessionService: SessionService,
        public router: Router,
        public cartService: CartService,
    ) {

    }

    ngOnInit(): void {
        this.closeCartOnNav();
        this.isShowCartButton();
        this.isShowLoginButton();
    }

    closeCartOnNav(): void {
        this.router.events.subscribe(events => {
            this.cart.close();
        });
    }

    isShowCartButton(): void {
        this.sessionService.userType$()
            .subscribe(userType => {
                this.showCartButton = userType === UserType.CUSTOMER;
            });
    }

    isShowLoginButton(): void {
        this.sessionService.isLoggedIn$()
            .subscribe(loggedIn => {
                this.loggedIn = loggedIn;
            });
    }

    toggleCart(): void {
        if (this.isInCartRoute()) {
            return;
        }

        if (!this.cart.opened) {
            this.cartService.getCoupons$().pipe(first()).subscribe();
        }
        this.cart.toggle();
    }

    isInCartRoute(): boolean {
        const url = this.router.url;
        return url.includes('cart');
    }
}
