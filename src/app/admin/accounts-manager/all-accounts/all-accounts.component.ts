import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EndpointService} from '../../../endpoint/endpoint.service';
import {AccountDetailsService} from '../../../account/services/account-details.service';
import {Account} from '../../../model/Account';
import {UserType} from '../../../model/UserType';
import {Admin} from '../../../model/Admin';
import {AccountManagerService} from '../../services/account-manager.service';
import {MatTable} from '@angular/material/table';
import {TitleService} from '../../../title/title.service';

@Component({
    selector: 'app-all-accounts',
    templateUrl: './all-accounts.component.html',
    styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {

    @ViewChild('accountsTable')
    accountsTable: MatTable<Account> = null;

    displayedColumns: string[] = [
        'profile',
        'email',
        'firstName',
        'lastName',
        'userType',
        'credits',
    ];

    public accounts: Account[] = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private endpoint: EndpointService,
        private accountDetailsService: AccountDetailsService,
        private accountManagerService: AccountManagerService,
        private titleService: TitleService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('All Accounts | Dashboard');
        this.activatedRoute.data.subscribe((data: { accounts: Account[] }) => {
            this.removeUserAccount(data.accounts);
            this.removeAdminIfNotMain(data.accounts);
        });
    }

    private removeUserAccount(accounts: Account[]): void {
        this.accountDetailsService.account$.subscribe((userAccount: Account) => {
            if (!userAccount && !userAccount) {
                return;
            }
            const index = accounts.findIndex(account => account.id === userAccount.id);
            accounts.splice(index, 1);
        });

        this.accounts = accounts;
    }

    private removeAdminIfNotMain(accounts: Account[]) {
        this.accountDetailsService.account$.subscribe((userAccount: Account) => {
            if (!(userAccount && userAccount.user && userAccount.user.type === UserType.ADMIN)) {
                return;
            }

            if (!(userAccount.user as Admin).main) {
                this.accounts = accounts.filter((account: Account) => {
                    return account?.user?.type !== UserType.ADMIN;
                });
            }
        });
    }

    public deleteAccount(account: Account): void {
        this.accountManagerService.getWarningDialog(account)
            .afterClosed().subscribe(proceed => {
            if (!proceed) {
                return;
            }
            const index = this.removeAccountFromCollection(account);
            this.accountManagerService.delete$(account.id)
                .subscribe({
                    error: (err) => {
                        this.accounts.splice(index, 0, account);
                        this.accountsTable.renderRows();
                    }
                });
        });
    }

    private removeAccountFromCollection(account: Account) {
        const index = this.accounts.findIndex(acc => acc.id === account.id);
        this.accounts.splice(index, 1);
        this.accountsTable.renderRows();
        return index;
    }

    generateUrl(profilePictureUrl: string): string {
        if (!profilePictureUrl) {
            return '';
        }
        return `${this.endpoint.res}${profilePictureUrl}`;
    }
}
