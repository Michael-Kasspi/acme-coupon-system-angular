import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponListItemComponent } from './coupon-list-item.component';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
    declarations: [CouponListItemComponent],
    exports: [
        CouponListItemComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule,
        MatRippleModule,
        MatIconModule,
        MatChipsModule,
        MatTooltipModule,
        MatButtonModule,
        MatDividerModule
    ]
})
export class CouponListItemModule { }
