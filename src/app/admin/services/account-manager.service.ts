import {Injectable} from '@angular/core';
import {AdminService} from './admin.service';
import {Observable} from 'rxjs';
import {Account} from '../../model/Account';
import {finalize, map, tap} from 'rxjs/operators';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountDetailsService} from '../../account/services/account-details.service';
import {UserType} from '../../model/UserType';
import {Admin} from '../../model/Admin';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WarningDialogComponent} from '../../dialog/warning-dialog/warning-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AccountManagerService {

    constructor(
        private adminService: AdminService,
        private progressBar: ManualProgressBarService,
        private snackBar: MatSnackBar,
        private accountDetailsService: AccountDetailsService,
        private dialog: MatDialog
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

    public update$(account: Account): Observable<Account> {
        this.progressBar.status = true;
        return this.adminService.updateAccount(account).pipe(
            finalize(() => this.progressBar.status = false),
            tap(account => {
                this.snackBar.open('The account has been updated successfully');
            }));
    }

    public delete$(id: number): Observable<Account> {
        this.progressBar.status = true;
        return this.adminService.deleteAccount(id).pipe(
            finalize(() => this.progressBar.status = false),
            tap(_ => {
                this.snackBar.open('The account has been deleted successfully');
            }));
    }

    public getAccount$(id: number): Observable<Account> {
        return this.adminService.getAccount(id);
    }

    public getAvailableUserTypes$(): Observable<string[]> {
        return this.accountDetailsService.account$.pipe(map((userAccount: Account) => {
            const userTypes = [UserType.CUSTOMER, UserType.COMPANY];
            if (AccountManagerService.checkMainAdmin(userAccount)) {
                userTypes.push(UserType.ADMIN);
            }
            return userTypes;
        }));
    }

    public getWarningDialog(account: Account): MatDialogRef<WarningDialogComponent> {
        return this.dialog.open(WarningDialogComponent, {
            data: {
                title: 'Confirm account deletion',
                body: `Are you sure you want to delete ${account.fullName}'s account?`,
                action: 'Delete'
            }
        });
    }

    private static checkMainAdmin(userAccount: Account): boolean {
        return userAccount?.user?.type === UserType.ADMIN && (userAccount.user as Admin).main;
    }

}
