import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {
        path: 'login',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'logout',
        loadChildren: () => import('./auth/logout/logout.module').then(m => m.LogoutModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
    },
    {
        path: 'coupons',
        loadChildren: () => import('./coupon/coupon-page/coupon-page.module').then(m => m.CouponPageModule)
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
    },
    {path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        preloadingStrategy: PreloadAllModules,
        onSameUrlNavigation: 'reload',
        anchorScrolling: 'enabled',
        relativeLinkResolution: 'corrected'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
