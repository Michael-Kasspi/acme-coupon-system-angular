import {Component, OnInit, ViewChild} from '@angular/core';
import {Account} from '../../../model/Account';
import {AccountManagerService} from '../../services/account-manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AccountManagerFormComponent} from '../../../account/components/account-manager-form/account-manager-form.component';
import {TitleService} from '../../../title/title.service';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

    public userTypes: string[] = null;

    @ViewChild(AccountManagerFormComponent)
    private accountFormComponent: AccountManagerFormComponent;

    constructor(
        private activatedRoute: ActivatedRoute,
        private accountManager: AccountManagerService,
        private accountManagerService: AccountManagerService,
        private router: Router,
        private titleService: TitleService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Add Account | Dashboard');
        this.accountManagerService.getAvailableUserTypes$()
            .subscribe(userTypes => this.userTypes = userTypes);
    }

    public save(account: Account) {
        this.accountFormComponent.processing = true;
        this.accountManager.save$(account).pipe(finalize(() => this.accountFormComponent.processing = false))
            .subscribe(account => {
                this.router.navigate([`../edit/${account.id}`], {relativeTo: this.activatedRoute});
            });
    }
}
