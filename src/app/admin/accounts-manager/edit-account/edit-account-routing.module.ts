import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EditAccountComponent} from './edit-account.component';
import {AdminAccountResolverService} from '../../resolvers/admin-account-resolver.service';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '0'},
    {path: ':id', component: EditAccountComponent, resolve: {account: AdminAccountResolverService}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditAccountRoutingModule {
}
