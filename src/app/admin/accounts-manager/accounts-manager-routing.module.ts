import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccountsManagerComponent} from './accounts-manager.component';

const routes: Routes = [{
    path: '', component: AccountsManagerComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'all'},
        {path: 'all', loadChildren: () => import('./all-accounts/all-accounts.module').then(m => m.AllAccountsModule)},
        {path: 'add', loadChildren: () => import('./add-account/add-account.module').then(m => m.AddAccountModule)},
        {path: 'edit', loadChildren: () => import('./edit-account/edit-account.module').then(m => m.EditAccountModule)},
    ]
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsManagerRoutingModule {
}
