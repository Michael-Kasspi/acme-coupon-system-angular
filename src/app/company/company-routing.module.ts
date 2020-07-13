import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CompanyComponent} from './company.component';
import {CompanyResolverService} from './resolvers/company-resolver.service';

const routes: Routes = [
    {
        path: '', component: CompanyComponent, resolve: {company: CompanyResolverService}, children: [
            {path: '', pathMatch: 'full', redirectTo: 'coupons'},
            {
                path: 'profile',
                loadChildren: () => import('./company-profile/company-profile.module').then(m => m.CompanyProfileModule)
            },
            { path: 'coupons', loadChildren: () => import('../coupon/coupon-manager/coupon-manager.module').then(m => m.CouponManagerModule) },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {
}
