import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {Observable, of, Subject} from 'rxjs';
import {first, flatMap, merge, tap} from 'rxjs/operators';
import {Account} from '../../model/Account';
import {SessionService} from '../../auth/session/session.service';
import {UserType} from '../../model/UserType';

@Injectable({
    providedIn: 'root'
})
export class AccountDetailsService {

    private _account: Account = null;
    private _account$: Subject<Account> = new Subject();

    constructor(
        private accountService: AccountService,
        private sessionService: SessionService
    ) {
        this.listenForUserChange();
    }

    public get account$(): Observable<Account> {
        return new Observable<Account>(subscriber => {
            this.fetchAccount$().subscribe(_ => {
                subscriber.next(this._account);
            }, subscriber.error);
        }).pipe(merge(this._account$));
    }

    public set account(account: Account) {
        if (account) {
            this._account = account;
            this._account$.next(account);
        } else {
            this._account = null;
            this._account$.next(null);
        }
    }

    private fetchAccount$(): Observable<Account> {
        if (this._account) {
            return of(this._account);
        }

        return this.sessionService.userType$().pipe(first(), flatMap(userType => {
            if (userType === UserType.GUEST) {
                return of(null);
            }
            return this.accountService.getAccount().pipe(first(), tap(account => {
                this.account = account;
            }));
        }));
    }

    private listenForUserChange(): void {
        this.sessionService.userType$().subscribe(userType => {
            if (userType === UserType.GUEST) {
                if (this._account) {
                    this.account = null;
                }
            }

            if (!this._account) {
                this.fetchAccount$().pipe(first()).subscribe();
            }
        });
    }

}
