import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {HomeResolverService} from './resolvers/home-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent, resolve: {coupons: HomeResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
