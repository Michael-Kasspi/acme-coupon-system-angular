import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardRedirectComponent} from './dashboard-redirect/dashboard-redirect.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [DashboardComponent, DashboardRedirectComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatProgressSpinnerModule,
    ]
})
export class DashboardModule { }
