import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerCreditsRoutingModule } from './customer-credits-routing.module';
import { CustomerCreditsComponent } from './customer-credits.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CustomerCreditsComponent],
    imports: [
        CommonModule,
        CustomerCreditsRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class CustomerCreditsModule { }
