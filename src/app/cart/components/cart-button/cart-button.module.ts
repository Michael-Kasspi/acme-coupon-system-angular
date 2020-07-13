import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartButtonComponent} from './cart-button.component';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [CartButtonComponent],
  exports: [
    CartButtonComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatBadgeModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class CartButtonModule { }
