import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyManagerComponent } from './company-manager.component';
import {CompaniesResolverService} from '../resolvers/companies-resolver.service';

const routes: Routes = [{ path: '', component: CompanyManagerComponent, resolve: {companies: CompaniesResolverService} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyManagerRoutingModule { }
