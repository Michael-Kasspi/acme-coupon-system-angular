import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {DashboardRedirectComponent} from './dashboard-redirect/dashboard-redirect.component';
import {DashboardGuard} from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [DashboardGuard], children: [
      {path: '', pathMatch: 'full', component: DashboardRedirectComponent},
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'company',
        loadChildren: () => import('../company/company.module').then(m => m.CompanyModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
