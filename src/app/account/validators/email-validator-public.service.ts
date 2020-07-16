import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {AccountService} from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class EmailValidatorPublicService implements AsyncValidator {

    private _currentEmail: string = null;

    constructor(private accountService: AccountService) {
    }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value;

        if (email === this.currentEmail) {
            return of(null);
        }
        return this.accountService.isDuplicateEmailPublic(email).pipe(
            first(),
            map(isDuplicate => (isDuplicate ? {duplicate: true} : null)),
            catchError(() => of(null))
        );
    }

    get currentEmail(): string {
        return this._currentEmail;
    }

    set currentEmail(value: string) {
        this._currentEmail = value;
    }
}
