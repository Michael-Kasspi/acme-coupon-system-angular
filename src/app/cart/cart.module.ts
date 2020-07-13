import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import {CartSidenavComponent} from './components/cart-sidenav/cart-sidenav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {CouponGridModule} from '../coupon/components/coupon-grid/coupon-grid.module';


@NgModule({
  declarations: [CartComponent, CartSidenavComponent],
  exports: [
    CartSidenavComponent
  ],
    imports: [
        CommonModule,
        CartRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        CouponGridModule
    ]
})
export class CartModule { }
