import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ErrorRes} from "../../../model/ErrorRes";

@Component({
    selector: 'app-error-details-dialog',
    templateUrl: './error-details-dialog.component.html',
    styleUrls: ['./error-details-dialog.component.scss']
})
export class ErrorDetailsDialogComponent implements OnInit {

    error: ErrorRes;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ErrorDetailsDialogComponent>
    ) {
    }

    ngOnInit(): void {
        this.error = new ErrorRes(this.data);
    }

    onOkClick(): void {
        this.dialogRef.close();
    }
}
