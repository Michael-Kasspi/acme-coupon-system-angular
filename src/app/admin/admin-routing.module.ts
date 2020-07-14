import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './admin.component';
import {AdminGuard} from './guards/admin.guard';

const routes: Routes = [{
  path: '', canActivate:[AdminGuard], component: AdminComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'companies'},
    {
      path: 'companies',
      loadChildren: () => import('./company-manager/company-manager.module').then(m => m.CompanyManagerModule)
    }, {
      path: 'accounts',
      loadChildren: () => import('./accounts-manager/accounts-manager.module').then(m => m.AccountsManagerModule)
    }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
