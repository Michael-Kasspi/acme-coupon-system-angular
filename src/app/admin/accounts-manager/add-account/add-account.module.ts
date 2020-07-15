import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAccountRoutingModule } from './add-account-routing.module';
import { AddAccountComponent } from './add-account.component';
import {AccountManagerFormModule} from '../../../account/components/account-manager-form/account-manager-form.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [AddAccountComponent],
    imports: [
        CommonModule,
        AddAccountRoutingModule,
        AccountManagerFormModule,
        MatCardModule
    ]
})
export class AddAccountModule { }
