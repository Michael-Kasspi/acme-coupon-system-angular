import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable, of, timer} from 'rxjs';
import {CategoryManagerService} from '../category-manager/category-manager.service';
import {catchError, map, switchMap} from 'rxjs/operators';

const EXECUTE_AFTER_MS = 500;

@Injectable({
    providedIn: 'root'
})
export class CategoryNameAsyncValidatorService implements AsyncValidator {

    private _categoryManagerService: CategoryManagerService;

    constructor() {
    }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {

        const name = control.value;
        const editingCategory = this._categoryManagerService.edit;

        if (editingCategory && editingCategory.name === name) {
            return of(null);
        }
        {
            return timer(EXECUTE_AFTER_MS).pipe(switchMap(_ => {
                return this._categoryManagerService.isCategoryNameExists(name)
                    .pipe(
                        map(exists => exists ? {duplicate: true} : null),
                        catchError(err => of(null))
                    );
            }));
        }
    }

    set categoryManagerService(value: CategoryManagerService) {
        this._categoryManagerService = value;
    }
}
