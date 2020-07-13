import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {CompanyManagerModule} from './company-manager/company-manager.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [AdminComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatButtonModule,
    ]
})
export class AdminModule {
}
