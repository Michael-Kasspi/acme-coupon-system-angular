import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustomerCouponsComponent} from './customer-coupons.component';
import {CustomerCouponsResolverService} from '../resolvers/customer-coupons-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: CustomerCouponsComponent,
        resolve: {coupons: CustomerCouponsResolverService}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerCouponsRoutingModule {
}
