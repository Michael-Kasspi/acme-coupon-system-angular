import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CouponThumbnailComponent} from './coupon-thumbnail.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    declarations: [CouponThumbnailComponent],
    exports: [
        CouponThumbnailComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatRippleModule,
        RouterModule,
        MatTooltipModule,
    ]
})
export class CouponThumbnailModule { }
