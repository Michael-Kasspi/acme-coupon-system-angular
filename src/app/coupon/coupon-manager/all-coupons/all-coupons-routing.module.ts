import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AllCouponsComponent} from './all-coupons.component';
import {AllCouponsResolverService} from '../../resolvers/all-coupons-resolver.service';

const routes: Routes = [
    {
        path: '',
        resolve: {coupons: AllCouponsResolverService},
        component: AllCouponsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllCouponsRoutingModule {
}
