import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Credentials} from 'src/app/model/Credentials';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent {

    @Input()
    dialog: MatDialogRef<any> = null;

    loggingIn: boolean = false;


    invalidCredentials: boolean = false;

    @Output() loginRequest = new EventEmitter<Credentials>();

    hide: boolean = true;


    constructor() {
    }

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    public onSubmit(): void {
        this.loginRequest.emit(this.loginForm.value);
    }

    get email(): AbstractControl {
        return this.loginForm.get('email');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }
}
