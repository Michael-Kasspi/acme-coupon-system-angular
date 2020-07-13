import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsManagerComponent } from './accounts-manager.component';

const routes: Routes = [{ path: '', component: AccountsManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsManagerRoutingModule { }
