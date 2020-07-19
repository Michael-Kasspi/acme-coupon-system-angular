import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ErrorHandlerService} from '../../../../error-handler/error-handler.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.errorHandlerService.redirect = false;
    }

    ngOnDestroy(): void {
        this.errorHandlerService.redirect = true;
    }

}
