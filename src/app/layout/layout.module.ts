import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FooterComponent} from './components/footer/footer.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {LogoModule} from '../logo/logo.module';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {SearchBoxModule} from '../search/components/search-box/search-box.module';
import {CartButtonModule} from '../cart/components/cart-button/cart-button.module';
import {UserMenuButtonModule} from '../account/components/user-menu-button/user-menu-button.module';
import {LoginButtonModule} from '../auth/login/components/login-button/login-button.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CartModule} from '../cart/cart.module';
import {SidenavMenuComponent} from './components/sidenav-menu/sidenav-menu.component';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
    declarations: [LayoutComponent, FooterComponent, ToolbarComponent, SidenavMenuComponent],
    exports: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        ToolbarModule,
        LogoModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        SearchBoxModule,
        CartButtonModule,
        UserMenuButtonModule,
        LoginButtonModule,
        MatSidenavModule,
        CartModule,
        MatDividerModule,
    ]
})
export class LayoutModule {
}
