import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCouponRoutingModule } from './edit-coupon-routing.module';
import { EditCouponComponent } from './edit-coupon.component';
import {MatCardModule} from '@angular/material/card';
import {CouponFormModule} from '../../components/coupon-form/coupon-form.module';


@NgModule({
  declarations: [EditCouponComponent],
    imports: [
        CommonModule,
        EditCouponRoutingModule,
        MatCardModule,
        CouponFormModule
    ]
})
export class EditCouponModule { }
