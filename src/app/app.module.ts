import {BrowserModule, Title} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {ErrorDetailsDialogComponent} from './error-handler/dialog/error-details-dialog/error-details-dialog.component';
import {ErrorSnackBarComponent} from './error-handler/dialog/error-snack-bar/error-snack-bar.component';
import {DiscardDialogComponent} from './dialog/discard-dialog/discard-dialog.component';
import {FileUploadDialogComponent} from './dialog/file-upload-dialog/file-upload-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import {materialDefaultSettingsProviders} from './material/material-default-settings-providers';
import {httpInterceptorProviders} from './interceptors/interceptors';
import {DialogModule} from './dialog/dialog.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {LoginDialogComponent} from './auth/login/components/login-dialog/login-dialog.component';
import {LogoutDialogComponent} from './auth/logout/components/logout-dialog/logout-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorHandlerModule} from './error-handler/error-handler.module';
import {MatNativeDateModule} from '@angular/material/core';
import {WarningDialogComponent} from './dialog/warning-dialog/warning-dialog.component';
import {SearchFilterFormComponent} from './search/components/search-filter-form/search-filter-form.component';
import {EndpointService} from './endpoint/endpoint.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LayoutModule,
        DialogModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatDialogModule,
        ErrorHandlerModule,
        MatNativeDateModule
    ],
    /*components for dialog and snack-bar*/
    entryComponents: [
        ErrorDetailsDialogComponent,
        ErrorSnackBarComponent,
        LoginDialogComponent,
        LogoutDialogComponent,
        DiscardDialogComponent,
        FileUploadDialogComponent,
        WarningDialogComponent,
        SearchFilterFormComponent
    ],
    providers: [
        Title,
        CookieService,
        httpInterceptorProviders,
        materialDefaultSettingsProviders,
        {
            provide: APP_INITIALIZER,
            useFactory: (endpointService: EndpointService) => () => endpointService.init(),
            deps: [EndpointService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {
}
