import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCouponsRoutingModule } from './all-coupons-routing.module';
import { AllCouponsComponent } from './all-coupons.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [AllCouponsComponent],
    imports: [
        CommonModule,
        AllCouponsRoutingModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class AllCouponsModule { }
