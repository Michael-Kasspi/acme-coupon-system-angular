import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartCheckoutRoutingModule } from './cart-checkout-routing.module';
import { CartCheckoutComponent } from './cart-checkout.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [CartCheckoutComponent],
    imports: [
        CommonModule,
        CartCheckoutRoutingModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class CartCheckoutModule { }
