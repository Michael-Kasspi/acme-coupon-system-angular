import {Injectable} from '@angular/core';
import {AdminService} from './admin.service';
import {Observable} from 'rxjs';
import {Account} from '../../model/Account';
import {finalize, tap} from 'rxjs/operators';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AccountManagerService {

    constructor(
        private adminService: AdminService,
        private progressBar: ManualProgressBarService,
        private snackBar: MatSnackBar
    ) {
    }

    public save$(account: Account): Observable<Account> {
        this.progressBar.status = true;
        return this.adminService.addAccount(account).pipe(
            finalize(() => this.progressBar.status = false),
            tap(account => {
                this.snackBar.open('The account has been saved successfully');
            }));
    }
}
