import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CouponPageComponent} from './coupon-page.component';
import {CouponResolverService} from '../resolvers/coupon-resolver.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home' /*TODO: should redirect to some kind of coupons array*/},
  {path: 'page/:id', component: CouponPageComponent, resolve: {coupon: CouponResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponPageRoutingModule {
}
