import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class MaxLengthAndDuplicateErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && (control?.errors?.maxlength || control?.errors?.duplicate || (control.touched && control.invalid) || isSubmitted));
    }

}
