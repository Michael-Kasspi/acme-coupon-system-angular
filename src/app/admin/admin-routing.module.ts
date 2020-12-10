import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './admin.component';
import {AdminGuard} from './guards/admin.guard';

const routes: Routes = [{
    path: '', canActivate: [AdminGuard], component: AdminComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'accounts'},
        {
            path: 'accounts',
            loadChildren: () => import('./accounts-manager/accounts-manager.module').then(m => m.AccountsManagerModule)
        },
        {
            path: 'coupons',
            loadChildren: () => import('../coupon/coupon-manager/coupon-manager.module').then(m => m.CouponManagerModule)
        },
        {
            path: 'categories',
            loadChildren: () => import('../category-manager/category-manager.module').then(m => m.CategoryManagerModule)
        },
    ]
},];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
