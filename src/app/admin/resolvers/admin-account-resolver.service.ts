import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AccountManagerService} from '../services/account-manager.service';
import {EMPTY, Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {Account} from '../../model/Account';

@Injectable({
    providedIn: 'root'
})
export class AdminAccountResolverService implements Resolve<Account> {

    constructor(
        private accountManagerService: AccountManagerService,
        private snackBar: MatSnackBar,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> {
        const id = +route.paramMap.get('id');
        if (!id || isNaN(id)) {
            this.snackBar.open('Unable to fetch account without Id');
            return EMPTY;
        }
        return this.accountManagerService.getAccount$(id).pipe(catchError(err => EMPTY));
    }


}
