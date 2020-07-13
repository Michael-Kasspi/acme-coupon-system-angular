import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CouponDetailsComponent} from './coupon-details.component';
import {MatIconModule} from '@angular/material/icon';
import {ImagePlaceholderModule} from '../../../components/image-placeholder/image-placeholder.module';
import {MatRippleModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [CouponDetailsComponent],
    exports: [
        CouponDetailsComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        ImagePlaceholderModule,
        MatRippleModule,
        MatChipsModule,
        RouterModule,
        MatTooltipModule,
        MatDividerModule,
        MatButtonModule,
    ]
})
export class CouponDetailsModule { }
