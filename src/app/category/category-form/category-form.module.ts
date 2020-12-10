import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form.component';



@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    CommonModule
  ],
  exports: [CategoryFormComponent]
})
export class CategoryFormModule { }
