import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CartComponent} from './cart.component';
import {CartResolverService} from './resolvers/cart-resolver.service';
import {CartGuard} from './guards/cart.guard';

const routes: Routes = [{
    path: '', component: CartComponent, canActivate: [CartGuard], resolve: {coupons: CartResolverService}, children: [
        {path: '', pathMatch: 'full', redirectTo: 'items'},
        {
            path: 'items',
            loadChildren: () => import('./cart-item/cart-item.module').then(m => m.CartItemModule)
        },
        {
            path: 'checkout',
            loadChildren: () => import('./cart-checkout/cart-checkout.module').then(m => m.CartCheckoutModule)
        },
    ]
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule {
}
