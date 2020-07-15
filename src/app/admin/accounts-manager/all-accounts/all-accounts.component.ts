import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EndpointService} from '../../../endpoint/endpoint.service';

@Component({
    selector: 'app-all-accounts',
    templateUrl: './all-accounts.component.html',
    styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {

    displayedColumns: string[] = [
        'profile',
        'email',
        'lastName',
        'firstName',
        'userType',
        'credits',
    ];

    public accounts: Account[] = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private endpoint: EndpointService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { accounts: Account[] }) => {
            this.accounts = data.accounts;});
    }

    public editAccount(account: Account): void {

    }

    public deleteAccount(account: Account): void {

    }

    generateUrl(profilePictureUrl: string): string {
        if (!profilePictureUrl) {
            return '';
        }
        return `${this.endpoint.res}${profilePictureUrl}`;
    }
}
