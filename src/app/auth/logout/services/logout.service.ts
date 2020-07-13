import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {finalize, first, map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogoutDialogComponent} from '../components/logout-dialog/logout-dialog.component';
import {EndpointService} from '../../../endpoint/endpoint.service';
import {SessionService} from '../../session/session.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {

    constructor(
        private client: HttpClient,
        private session: SessionService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private endpoint: EndpointService
    ) {
    }

    openLogoutDialog() {
        this.dialog.open(
            LogoutDialogComponent,
            {
                closeOnNavigation: true,
                width: '300px'
            });
    }

    logout(): Observable<any> {
        return this.session.isLoggedIn$()
            .pipe(
                first(),
                map(isLoggedIn => {

                    if (!isLoggedIn) {
                        this.session.clearSession();
                        return EMPTY;
                    }

                    return this.client.post<any>(
                        this.endpoint.url + 'logout',
                        null,
                        {withCredentials: true}
                    );

                }),
                finalize(() => {
                    this.session.clearSession();
                    this.snackBar.open('You have been signed out successfully');
                }));
    };
}

