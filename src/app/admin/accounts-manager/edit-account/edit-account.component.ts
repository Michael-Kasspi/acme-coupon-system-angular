import {Component, OnInit, ViewChild} from '@angular/core';
import {Account} from '../../../model/Account';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountManagerService} from '../../services/account-manager.service';
import {AccountManagerFormComponent} from '../../../account/components/account-manager-form/account-manager-form.component';
import {finalize, tap} from 'rxjs/operators';
import {TitleService} from '../../../title/title.service';
import {Observable} from 'rxjs';
import {ManualProgressBarService} from '../../../progress-bar/manual-progress-bar.service';

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
        private router: Router,
        private titleService: TitleService,
        private progressBarService: ManualProgressBarService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Edit Account | Dashboard');
        this.activatedRoute.data.subscribe((data: { account: Account }) => {
            this.account = data.account;
            if (this.account && this.account.fullName) {
                this.titleService.append(`Edit Account: ${this.account.fullName} | Dashboard`);
            }
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
            this.accountFormComponent.processing = true;
            this.accountManagerService.delete$(account.id)
                .pipe(finalize(() => this.accountFormComponent.processing = false))
                .subscribe(account => {
                    this.router.navigate(['../../all'], {relativeTo: this.activatedRoute});
                });
        });
    }

    public canDeactivate(): Observable<boolean> | boolean {
        if (!this.accountFormComponent || this.accountFormComponent.accountForm.pristine) {
            return true;
        }
        this.progressBarService.status = false;
        return this.accountManagerService.getDiscardDialog()
            .pipe(tap(value => this.progressBarService.status = value));
    }
}
