import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryManagerRoutingModule} from './category-manager-routing.module';
import {CategoryManagerComponent} from './category-manager.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CategoryFormModule} from '../category-form/category-form.module';
import {CategoryListModule} from '../category-list/category-list.module';


@NgModule({
  declarations: [CategoryManagerComponent],
    imports: [
        CommonModule,
        CategoryManagerRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatTooltipModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        CategoryFormModule,
        CategoryListModule,
    ]
})
export class CategoryManagerModule { }
