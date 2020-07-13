import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [CustomerComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        MatTabsModule
    ]
})
export class CustomerModule { }
