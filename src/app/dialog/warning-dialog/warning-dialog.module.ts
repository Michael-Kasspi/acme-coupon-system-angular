import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {WarningDialogComponent} from './warning-dialog.component';


@NgModule({
    declarations: [
        WarningDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ]
})
export class WarningDialogModule {
}
