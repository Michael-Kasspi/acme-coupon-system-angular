import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LogoutService} from '../../../auth/logout/services/logout.service';
import {SessionService} from '../../../auth/session/session.service';
import {UserType} from '../../../model/UserType';
import {Subscription} from 'rxjs';
import {AccountDetailsService} from '../../services/account-details.service';
import {EndpointService} from '../../../endpoint/endpoint.service';
import {Account} from '../../../model/Account';

@Component({
    selector: 'app-user-menu-button',
    templateUrl: './user-menu-button.component.html',
    styleUrls: ['./user-menu-button.component.scss']
})
export class UserMenuButtonComponent implements OnInit, OnDestroy {

    customer: string = UserType.CUSTOMER;
    company: string = UserType.COMPANY;

    @Input()
    image: string = null;
    userType: string = null;
    account: Account = null;

    private userTypeSubscription$: Subscription = null;
    private accountSubscription$: Subscription = null;

    constructor(
        public logoutService: LogoutService,
        public sessionService: SessionService,
        private avatarService: AccountDetailsService,
        private endpoint: EndpointService
    ) {
    }

    ngOnInit(): void {
        this.userTypeSubscription$ = this.sessionService.userType$()
            .subscribe(userType => this.userType = userType);
        this.accountSubscription$ = this.avatarService.account$
            .subscribe(account => {
                this.account = account;
                this.image = this.generateAvatarUrl(account?.profilePictureUrl);
            });
    }

    ngOnDestroy(): void {
        this.userTypeSubscription$.unsubscribe();
        this.accountSubscription$.unsubscribe();
    }

    private generateAvatarUrl(imageURL: string): string {
        if (imageURL) {
            return `${this.endpoint.res}${imageURL}`;
        }
        return '';
    }
}

