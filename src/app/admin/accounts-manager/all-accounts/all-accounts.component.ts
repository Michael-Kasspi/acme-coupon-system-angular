import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-all-accounts',
    templateUrl: './all-accounts.component.html',
    styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {

    displayedColumns: string[] = [
        'id',
        'email',
        'lastName',
        'firstName',
        'userType',
        'credits',
    ];

    public accounts: Account[] = null;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { accounts: Account[] }) => {
            this.accounts = data.accounts;});
    }

    public editAccount(account: Account): void {

    }

    public deleteAccount(account: Account): void {

    }
}
