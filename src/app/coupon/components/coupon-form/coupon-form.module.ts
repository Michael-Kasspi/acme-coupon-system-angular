import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CouponFormComponent} from './coupon-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
    declarations: [CouponFormComponent],
    exports: [
        CouponFormComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        TextFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ]
})
export class CouponFormModule { }
