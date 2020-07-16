import {Component, OnInit, ViewChild} from '@angular/core';
import {Account} from '../../../model/Account';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountManagerService} from '../../services/account-manager.service';
import {AccountManagerFormComponent} from '../../../account/components/account-manager-form/account-manager-form.component';

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

    @ViewChild(AccountManagerFormComponent)
    accountFormComponent: AccountManagerFormComponent = null;

    public account: Account = null;
    public userTypes: string[] = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private accountManagerService: AccountManagerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { account: Account }) => {
            this.account = data.account;
        });

        this.accountManagerService.getAvailableUserTypes$()
            .subscribe(userTypes => this.userTypes = userTypes);
    }

    public update(account: Account): void {
        this.accountManagerService.update$(account).subscribe(account => {
            this.account.deserialize(account);
            this.accountFormComponent.reset();
        });
    }

    public delete(account: Account) {
        this.accountManagerService.getWarningDialog(account)
            .afterClosed().subscribe(proceed => {
            if (!proceed) {
                return;
            }
            this.accountManagerService.delete$(account.id).subscribe(account => {
                this.router.navigate(['../../all'], {relativeTo: this.activatedRoute});
            });
        });
    }
}
