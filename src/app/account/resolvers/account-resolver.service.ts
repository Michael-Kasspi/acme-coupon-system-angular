import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {AccountService} from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AccountResolverService implements Resolve<Account> {

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.accountService.getAccount().pipe(
            catchError(err => {
                this.router.navigate(['/..']);
                return EMPTY;
            })
        );
    }

}
