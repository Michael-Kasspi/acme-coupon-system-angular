import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponManagerRoutingModule } from './coupon-manager-routing.module';
import { CouponManagerComponent } from './coupon-manager.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [CouponManagerComponent],
    imports: [
        CommonModule,
        CouponManagerRoutingModule,
        MatTabsModule
    ]
})
export class CouponManagerModule { }
