import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsManagerRoutingModule } from './accounts-manager-routing.module';
import { AccountsManagerComponent } from './accounts-manager.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [AccountsManagerComponent],
    imports: [
        CommonModule,
        AccountsManagerRoutingModule,
        MatTabsModule
    ]
})
export class AccountsManagerModule { }
