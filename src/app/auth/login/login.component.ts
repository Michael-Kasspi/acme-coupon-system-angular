import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {TitleService} from '../../title/title.service';
import {Credentials} from '../../model/Credentials';
import {finalize, first} from 'rxjs/operators';
import {LoginService} from './services/login.service';
import {SessionService} from '../session/session.service';
import {UserType} from '../../model/UserType';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {error} from 'selenium-webdriver';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Input()
    dialog: MatDialogRef<any> = null;

    @ViewChild(LoginFormComponent)
    loginForm: LoginFormComponent = null;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private progressBarService: ManualProgressBarService,
        private titleService: TitleService,
        private sessionService: SessionService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Login');
    }


    login(credentials: Credentials): void {

        this.progressBarService.status = true;
        this.loginForm.loggingIn = true;

        this.loginService
            .login(credentials)
            .pipe(finalize(() => {
                this.progressBarService.status = false;
                this.loginForm.loggingIn = false;
            }))
            .subscribe(
                success => {
                    /*close the dialog in case the login was made through dialog window*/
                    if (this.dialog) {
                        this.dialog.close();
                    }

                    this.sessionService.userType$().pipe(first()).subscribe(userType => {
                        if (userType !== UserType.GUEST) {
                            this.router.navigate(['/dashboard', userType]);
                        }
                    });
                },error => {
                    this.loginForm.password.reset('');
                    this.loginForm.invalidCredentials = true;
                }
            );
    }

}
