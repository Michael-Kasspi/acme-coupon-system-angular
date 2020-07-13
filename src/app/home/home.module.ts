import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {CouponThumbnailModule} from '../coupon/components/coupon-thumbnail/coupon-thumbnail.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CouponGridModule} from '../coupon/components/coupon-grid/coupon-grid.module';


@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CouponThumbnailModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        CouponGridModule,
    ]
})
export class HomeModule { }
