import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError} from "rxjs/operators";
import {EMPTY, Observable} from 'rxjs';
import {AccountService} from '../services/account.service';
import {Account} from '../../model/Account';

@Injectable({
    providedIn: 'root'
})
export class AccountResolverService implements Resolve<Account> {

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> {
        return this.accountService.getAccount().pipe(
            catchError(err => {
                this.router.navigate(['/..']);
                return EMPTY;
            })
        );
    }

}
