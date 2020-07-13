import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditCouponComponent} from './edit-coupon.component';
import {CanDeactivateGuard} from '../../../can-deactivate/can-deactivate.guard';
import {EditCouponResolverService} from '../../resolvers/edit-coupon-resolver.service';
import {AllCategoriesResolverService} from '../../resolvers/all-categories-resolver.service';

const routes: Routes = [
    {path: '', component: EditCouponComponent},
    {
        path: ':id',
        component: EditCouponComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {coupon: EditCouponResolverService, categories: AllCategoriesResolverService}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditCouponRoutingModule {
}
