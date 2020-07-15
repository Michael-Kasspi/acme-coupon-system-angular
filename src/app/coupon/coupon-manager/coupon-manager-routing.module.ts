import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CouponManagerComponent} from './coupon-manager.component';
import {AllCompaniesResolverService} from '../resolvers/all-companies-resolver.service';

const routes: Routes = [{
    path: '', component: CouponManagerComponent, resolve: {companies: AllCompaniesResolverService}, children: [
        {path: '', pathMatch: 'full', redirectTo: 'all'},
        {
            path: 'all',
            loadChildren: () => import('./all-coupons/all-coupons.module').then(m => m.AllCouponsModule)
        },
        {
            path: 'edit', loadChildren: () => import('./edit-coupon/edit-coupon.module').then(m => m.EditCouponModule)
        },
        {
            path: 'add',
            loadChildren: () => import('./add-coupon/add-coupon.module').then(m => m.AddCouponModule)
        }
    ]
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CouponManagerRoutingModule {
}
