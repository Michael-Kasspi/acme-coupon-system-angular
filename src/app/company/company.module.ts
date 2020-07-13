import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [CompanyComponent],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        MatTabsModule,
        MatMenuModule,
        MatToolbarModule,
        MatButtonModule,
        MatDividerModule,
    ]
})
export class CompanyModule { }
