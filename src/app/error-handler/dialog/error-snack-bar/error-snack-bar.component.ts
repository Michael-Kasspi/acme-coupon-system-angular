import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";


@Component({
    selector: 'app-error-snack-bar',
    templateUrl: './error-snack-bar.component.html',
    styleUrls: ['./error-snack-bar.component.css']
})
export class ErrorSnackBarComponent implements OnInit {

    constructor(
        public snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
    }

}
