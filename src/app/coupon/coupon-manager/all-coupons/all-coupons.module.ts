import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCouponsRoutingModule } from './all-coupons-routing.module';
import { AllCouponsComponent } from './all-coupons.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [AllCouponsComponent],
    imports: [
        CommonModule,
        AllCouponsRoutingModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class AllCouponsModule { }
