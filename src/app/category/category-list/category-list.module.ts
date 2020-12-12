import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
    declarations: [CategoryListComponent],
    exports: [
        CategoryListComponent
    ],
    imports: [
        CommonModule,
        MatRippleModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class CategoryListModule { }
