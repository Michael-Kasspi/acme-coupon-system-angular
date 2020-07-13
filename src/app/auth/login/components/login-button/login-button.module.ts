import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginButtonComponent} from './login-button.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [LoginButtonComponent],
  exports: [
    LoginButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class LoginButtonModule { }
