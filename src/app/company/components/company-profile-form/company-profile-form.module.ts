import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileFormComponent } from './company-profile-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ImageManagerModule} from '../../../image-manager/image-manager.module';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [CompanyProfileFormComponent],
    exports: [
        CompanyProfileFormComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ImageManagerModule,
        MatInputModule,
        MatDividerModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class CompanyProfileFormModule { }
