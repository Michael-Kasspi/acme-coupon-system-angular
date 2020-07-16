import {Component, OnInit} from '@angular/core';
import {Account} from '../../../model/Account';
import {AccountManagerService} from '../../services/account-manager.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
    public userTypes: string[] = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private accountManager: AccountManagerService,
        private accountManagerService: AccountManagerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.accountManagerService.getAvailableUserTypes$()
            .subscribe(userTypes => this.userTypes = userTypes);
    }

    public save(account: Account) {
        this.accountManager.save$(account).subscribe(account => {
            this.router.navigate([`../edit/${account.id}`], {relativeTo: this.activatedRoute});
        });
    }
}
