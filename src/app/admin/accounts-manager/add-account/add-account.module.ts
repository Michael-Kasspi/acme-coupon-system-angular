import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAccountRoutingModule } from './add-account-routing.module';
import { AddAccountComponent } from './add-account.component';


@NgModule({
  declarations: [AddAccountComponent],
  imports: [
    CommonModule,
    AddAccountRoutingModule
  ]
})
export class AddAccountModule { }
