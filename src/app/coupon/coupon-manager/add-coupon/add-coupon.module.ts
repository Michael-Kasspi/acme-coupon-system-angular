import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCouponRoutingModule } from './add-coupon-routing.module';
import { AddCouponComponent } from './add-coupon.component';
import {CouponFormModule} from '../../components/coupon-form/coupon-form.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [AddCouponComponent],
    imports: [
        CommonModule,
        AddCouponRoutingModule,
        CouponFormModule,
        MatCardModule
    ]
})
export class AddCouponModule { }
