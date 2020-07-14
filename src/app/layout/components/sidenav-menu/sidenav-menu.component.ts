import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {UserType} from '../../../model/UserType';
import {SessionService} from '../../../auth/session/session.service';

@Component({
    selector: 'app-sidenav-menu',
    templateUrl: './sidenav-menu.component.html',
    styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit, OnDestroy {

    userType: string = null;
    userTypeSubscription$: Subscription = null;
    isLoggedInSubscription$: Subscription = null;
    loggedIn: boolean = false;

    constructor(
        public sessionService: SessionService
    ) {
    }

    ngOnInit(): void {
        this.userTypeSubscription$ = this.sessionService.userType$()
            .subscribe(userType => {
                this.userType = userType;
            });

        this.isLoggedInSubscription$ = this.sessionService.isLoggedIn$()
            .subscribe(loggedIn => this.loggedIn = loggedIn);
    }

    ngOnDestroy(): void {
        this.userTypeSubscription$.unsubscribe();
        this.isLoggedInSubscription$.unsubscribe();
    }

    isCustomerUser(): boolean {
        return this.userType === UserType.CUSTOMER;
    }
}
