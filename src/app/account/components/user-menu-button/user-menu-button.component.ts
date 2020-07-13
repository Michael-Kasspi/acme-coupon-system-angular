import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LogoutService} from '../../../auth/logout/services/logout.service';
import {SessionService} from '../../../auth/session/session.service';
import {UserType} from '../../../model/UserType';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-user-menu-button',
    templateUrl: './user-menu-button.component.html',
    styleUrls: ['./user-menu-button.component.scss']
})
export class UserMenuButtonComponent implements OnInit, OnDestroy {

    customer: string = UserType.CUSTOMER;

    @Input()
    image: string = null;
    userType: string = null;

    userTypeSubscription$: Subscription = null;

    constructor(
        public logoutService: LogoutService,
        public sessionService: SessionService
    ) {
    }

    ngOnInit(): void {
        this.userTypeSubscription$ = this.sessionService.userType$()
            .subscribe(userType => this.userType = userType);
    }

    ngOnDestroy(): void {
        this.userTypeSubscription$.unsubscribe();
    }
}

