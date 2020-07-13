import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerCouponsRoutingModule} from './customer-coupons-routing.module';
import {CustomerCouponsComponent} from './customer-coupons.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [CustomerCouponsComponent],
    imports: [
        CommonModule,
        CustomerCouponsRoutingModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class CustomerCouponsModule { }
