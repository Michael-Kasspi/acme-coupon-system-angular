import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagerRoutingModule } from './category-manager-routing.module';
import { CategoryManagerComponent } from './category-manager.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [CategoryManagerComponent],
    imports: [
        CommonModule,
        CategoryManagerRoutingModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatTooltipModule,
        MatSidenavModule,
        MatTabsModule
    ]
})
export class CategoryManagerModule { }
