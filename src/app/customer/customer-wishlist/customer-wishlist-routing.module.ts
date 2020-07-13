import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerWishlistComponent } from './customer-wishlist.component';

const routes: Routes = [{ path: '', component: CustomerWishlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerWishlistRoutingModule { }
