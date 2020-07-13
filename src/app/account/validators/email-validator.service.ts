import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {AccountService} from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

    constructor(private accountService: AccountService) {
    }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.accountService.isDuplicateEmail(control.value).pipe(
            first(),
            map(isDuplicate => (isDuplicate ? {uniqueEmail: true} : null)),
            catchError(() => of(null))
        );
    }


}
