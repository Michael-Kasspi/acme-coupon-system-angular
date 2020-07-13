import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {merge, startWith} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {UserType} from '../../model/UserType';
import {EndpointService} from '../../endpoint/endpoint.service';
import {User} from '../../model/User';
import {UserFactory} from '../../model/UserFactory';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private static readonly USER = 'user';
    private static readonly EXPIRY = 'expiry';
    private static readonly USER_TYPE = 'userType';
    private static readonly NO_EXPIRY = '';

    private _isLoggedIn$: Subject<boolean> = new Subject();
    private _userType$: Subject<string> = new Subject();
    private _user: User = null;

    constructor(
        private endpoint: EndpointService,
        private cookieService: CookieService,
    ) {
    }

    public initSession(user: User): void {
        this.user = user;
        this._isLoggedIn$.next(true);
        this._userType$.next(this.userType());
    }

    public clearSession(): void {
        this.user = null;
        this.cookieService.deleteAll('/');
        this._isLoggedIn$.next(false);
        this._userType$.next(UserType.GUEST);
    }

    public isLoggedIn$(): Observable<boolean> {
        return this._isLoggedIn$
            .asObservable()
            .pipe(startWith(this.isLoggedIn()));
    }

    public userType$(): Observable<string> {
        return this._userType$
            .asObservable()
            .pipe(startWith(this.userType()));
    }

    private userType(): string {

        const found = this.cookieService.check(SessionService.USER_TYPE);

        if (!found) {
            return UserType.GUEST;
        }

        return this.cookieService.get(SessionService.USER_TYPE);
    }

    private isLoggedIn(): boolean {

        const loggedIn = !this.isExpired();

        if (!loggedIn) {
            this.clearSession();
        }

        return loggedIn;
    }


    private isExpired(): boolean {

        if (this.cookieService.check(SessionService.EXPIRY)) {
            let expiryString = this.cookieService.get(SessionService.EXPIRY);

            if (expiryString !== SessionService.NO_EXPIRY) {

                let expiry = parseInt(expiryString);
                let now = new Date().valueOf();

                return now > expiry;
            }
        }
        return true;
    }

    get user(): User {
        if (this._user === null) {
            const potentialUser = localStorage.getItem(SessionService.USER);
            if (!potentialUser) {
                return null;
            }
            const parsedUser = JSON.parse(potentialUser);
            return UserFactory.get(parsedUser._type).deserialize(parsedUser);
        }
        return this._user;
    }

    set user(value: User) {
        if (value === null) {
            localStorage.removeItem(SessionService.USER);
        } else {
            localStorage.setItem(SessionService.USER, JSON.stringify(value));
        }
        this._user = value;
    }
}
