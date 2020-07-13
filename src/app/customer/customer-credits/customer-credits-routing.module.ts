import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustomerCreditsComponent} from './customer-credits.component';
import {AccountResolverService} from '../../account/resolvers/account-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: CustomerCreditsComponent,
        resolve: {account: AccountResolverService}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerCreditsRoutingModule {
}
