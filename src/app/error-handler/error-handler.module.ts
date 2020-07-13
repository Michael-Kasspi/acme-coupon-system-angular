import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorDetailsDialogComponent} from './dialog/error-details-dialog/error-details-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ErrorSnackBarComponent} from './dialog/error-snack-bar/error-snack-bar.component';

@NgModule({
    declarations: [ErrorDetailsDialogComponent, ErrorSnackBarComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ]
})
export class ErrorHandlerModule {
}
