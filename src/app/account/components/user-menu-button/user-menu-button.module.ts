import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserMenuButtonComponent} from './user-menu-button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [UserMenuButtonComponent],
  exports: [
    UserMenuButtonComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        RouterModule,
        MatDividerModule,
    ]
})
export class UserMenuButtonModule { }
