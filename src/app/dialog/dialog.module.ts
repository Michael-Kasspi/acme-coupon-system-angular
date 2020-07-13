import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DiscardDialogModule} from './discard-dialog/discard-dialog.module';
import {FileUploadDialogModule} from './file-upload-dialog/file-upload-dialog.module';
import {WarningDialogModule} from './warning-dialog/warning-dialog.module';


@NgModule({
  declarations: [],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        DiscardDialogModule,
        FileUploadDialogModule,
        WarningDialogModule
    ]
})
export class DialogModule { }
