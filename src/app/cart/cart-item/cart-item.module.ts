import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartItemRoutingModule} from './cart-item-routing.module';
import {CartItemComponent} from './cart-item.component';
import {MatCardModule} from '@angular/material/card';
import {CouponListItemModule} from '../../coupon/components/coupon-list-item/coupon-list-item.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [CartItemComponent],
    imports: [
        CommonModule,
        CartItemRoutingModule,
        MatCardModule,
        CouponListItemModule,
        MatIconModule
    ]
})
export class CartItemModule { }
