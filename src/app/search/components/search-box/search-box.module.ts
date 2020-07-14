import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBoxComponent} from './search-box.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [SearchBoxComponent],
  exports: [
    SearchBoxComponent
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatTooltipModule
    ]
})
export class SearchBoxModule { }
