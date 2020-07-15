import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AllAccountsComponent} from './all-accounts.component';
import {AllAccountResolverService} from '../../resolvers/all-account-resolver.service';

const routes: Routes = [{path: '', component: AllAccountsComponent, resolve: {accounts: AllAccountResolverService}}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllAccountsRoutingModule {
}
