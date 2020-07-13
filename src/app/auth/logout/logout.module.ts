import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import {MatIconModule} from '@angular/material/icon';
import {LogoutDialogComponent} from './components/logout-dialog/logout-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [LogoutComponent, LogoutDialogComponent],
  imports: [
    CommonModule,
    LogoutRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class LogoutModule { }
