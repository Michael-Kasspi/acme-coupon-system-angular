import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerWishlistRoutingModule } from './customer-wishlist-routing.module';
import { CustomerWishlistComponent } from './customer-wishlist.component';


@NgModule({
  declarations: [CustomerWishlistComponent],
  imports: [
    CommonModule,
    CustomerWishlistRoutingModule
  ]
})
export class CustomerWishlistModule { }
