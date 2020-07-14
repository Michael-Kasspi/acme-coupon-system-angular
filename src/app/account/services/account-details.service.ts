import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {Observable, of, Subject} from 'rxjs';
import {merge, tap} from 'rxjs/operators';
import {Account} from '../../model/Account';

@Injectable({
    providedIn: 'root'
})
export class AccountDetailsService {

    private _account: Account = null;
    private _account$: Subject<Account> = new Subject();

    constructor(private accountService: AccountService) {
    }

    public get account$(): Observable<Account> {
        return new Observable<Account>(subscriber => {
            this.fetchAccount$().subscribe(_ => {
                subscriber.next(this._account);
                console.log(this._account);
            }, subscriber.error);
        }).pipe(merge(this._account$));
    }

    public set account(account: Account) {
        if (account) {
            this._account = account;
            this._account$.next(account);
        }
    }

    private fetchAccount$(): Observable<Account> {
        if (this._account) {
            return of(this._account);
        }
        return this.accountService.getAccount().pipe(tap(account => {
            this.account = account;
        }));
    }

}
