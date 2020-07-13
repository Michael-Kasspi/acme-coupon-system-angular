import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

    constructor(public matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    openLoginDialog() {
        this.matDialog.open(LoginDialogComponent)
    }
}
