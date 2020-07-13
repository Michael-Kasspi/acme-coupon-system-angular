import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AddCouponComponent} from './add-coupon.component';
import {AllCategoriesResolverService} from '../../resolvers/all-categories-resolver.service';
import {CanDeactivateGuard} from '../../../can-deactivate/can-deactivate.guard';

const routes: Routes = [
    {
        path: '',
        component: AddCouponComponent,
        resolve: {categories: AllCategoriesResolverService},
        canDeactivate: [CanDeactivateGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddCouponRoutingModule {
}
