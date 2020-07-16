import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAccountRoutingModule } from './edit-account-routing.module';
import { EditAccountComponent } from './edit-account.component';
import {AccountManagerFormModule} from '../../../account/components/account-manager-form/account-manager-form.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [EditAccountComponent],
    imports: [
        CommonModule,
        EditAccountRoutingModule,
        AccountManagerFormModule,
        MatCardModule
    ]
})
export class EditAccountModule { }
