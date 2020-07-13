import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponGridComponent } from './coupon-grid.component';
import {CouponThumbnailModule} from '../coupon-thumbnail/coupon-thumbnail.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
    declarations: [CouponGridComponent],
    exports: [
        CouponGridComponent
    ],
    imports: [
        CommonModule,
        CouponThumbnailModule,
        MatProgressSpinnerModule
    ]
})
export class CouponGridModule { }
