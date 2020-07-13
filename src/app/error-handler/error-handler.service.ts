import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDetailsDialogComponent} from "./dialog/error-details-dialog/error-details-dialog.component";
import {ErrorSnackBarComponent} from "./dialog/error-snack-bar/error-snack-bar.component";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    }

    public handleError(error: HttpErrorResponse) {

        let snackBarRef = this.snackBar.openFromComponent(
            ErrorSnackBarComponent,
            {data: {message: error.error.message || error.message || 'No error message is available'}}
        );

        snackBarRef.onAction().subscribe(
            value => {
                this.dialog.open(
                    ErrorDetailsDialogComponent,
                    {data: error}
                )
            });

        return throwError(error);
    }
}
