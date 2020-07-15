import {Component, OnInit} from '@angular/core';
import {Account} from '../../../model/Account';
import {AccountManagerService} from '../../services/account-manager.service';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

    constructor(private accountManager: AccountManagerService) {
    }

    ngOnInit(): void {
    }

    save(account: Account) {
        this.accountManager.save$(account).subscribe();
    }
}
