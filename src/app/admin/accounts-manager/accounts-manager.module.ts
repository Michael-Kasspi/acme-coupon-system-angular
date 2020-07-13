import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsManagerRoutingModule } from './accounts-manager-routing.module';
import { AccountsManagerComponent } from './accounts-manager.component';


@NgModule({
  declarations: [AccountsManagerComponent],
  imports: [
    CommonModule,
    AccountsManagerRoutingModule
  ]
})
export class AccountsManagerModule { }
