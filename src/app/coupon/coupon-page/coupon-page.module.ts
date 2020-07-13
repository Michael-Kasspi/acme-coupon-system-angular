import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CouponPageRoutingModule} from './coupon-page-routing.module';
import {CouponPageComponent} from './coupon-page.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CouponDetailsModule} from '../components/coupon-details/coupon-details.module';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {CouponGridModule} from '../components/coupon-grid/coupon-grid.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [CouponPageComponent],
    imports: [
        CommonModule,
        CouponPageRoutingModule,
        MatIconModule,
        MatButtonModule,
        CouponDetailsModule,
        MatCardModule,
        MatDividerModule,
        CouponGridModule,
        MatTabsModule,
        MatProgressSpinnerModule,
    ]
})
export class CouponPageModule { }
