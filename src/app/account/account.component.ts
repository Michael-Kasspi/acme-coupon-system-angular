import {Component, OnInit, ViewChild} from '@angular/core';
import {Account} from '../model/Account';
import {ActivatedRoute} from '@angular/router';
import {AccountFormComponent} from './components/account-form/account-form.component';
import {TitleService} from '../title/title.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    account: Account = null;

    @ViewChild('accountFormComponent')
    accountFormComponent: AccountFormComponent = null;

    constructor(
        private titleService: TitleService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Account');
        this.activatedRoute.data.subscribe((data: { account: Account }) => {
            this.account = new Account(data.account);
            this.titleService.append(this.account.fullName + ' | Account');
        });
    }

    public canDeactivate(): boolean | Observable<boolean> {
        return this.accountFormComponent.canDeactivate();
    }

}
