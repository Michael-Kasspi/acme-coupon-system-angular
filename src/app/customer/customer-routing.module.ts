import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustomerComponent} from './customer.component';
import {CustomerGuard} from './guards/customer.guard';

const routes: Routes = [
    {
        path: '', canActivate:[CustomerGuard], component: CustomerComponent, children: [
            {path: '', pathMatch: 'full', redirectTo: 'coupons'},
            {
                path: 'coupons',
                loadChildren: () => import('./customer-coupons/customer-coupons.module').then(m => m.CustomerCouponsModule)
            },
            {
                path: 'wishlist',
                loadChildren: () => import('./customer-wishlist/customer-wishlist.module').then(m => m.CustomerWishlistModule)
            },
            {
                path: 'credits',
                loadChildren: () => import('./customer-credits/customer-credits.module').then(m => m.CustomerCreditsModule)
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {
}
