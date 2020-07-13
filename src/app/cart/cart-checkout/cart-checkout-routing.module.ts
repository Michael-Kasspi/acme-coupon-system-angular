import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CartCheckoutComponent} from './cart-checkout.component';
import {AccountResolverService} from '../../account/resolvers/account-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: CartCheckoutComponent,
        resolve: {account: AccountResolverService}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartCheckoutRoutingModule {
}

