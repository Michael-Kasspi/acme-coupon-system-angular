import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import {AccountResolverService} from './resolvers/account-resolver.service';
import {CanDeactivateGuard} from '../can-deactivate/can-deactivate.guard';

const routes: Routes = [{ path: '', canDeactivate: [CanDeactivateGuard], component: AccountComponent, resolve: {account: AccountResolverService} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
