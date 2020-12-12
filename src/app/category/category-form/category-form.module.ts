import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryFormComponent} from './category-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ImageManagerModule} from '../../image-manager/image-manager.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CategoryFormComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ImageManagerModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule
    ],
  exports: [CategoryFormComponent]
})
export class CategoryFormModule { }
