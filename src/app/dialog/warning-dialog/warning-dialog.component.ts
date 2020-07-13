import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-warning-dialog',
    templateUrl: './warning-dialog.component.html',
    styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

    title: string = null;
    body: string = null;
    action: string = null;
    cancel: string = null;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        if (this.data) {
            this.title = this.data?.title;
            this.body = this.data?.body;
            this.action = this.data?.action;
            this.cancel = this.data?.cancel;
        }
    }

}
