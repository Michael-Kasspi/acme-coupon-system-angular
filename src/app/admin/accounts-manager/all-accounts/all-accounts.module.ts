import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllAccountsRoutingModule } from './all-accounts-routing.module';
import { AllAccountsComponent } from './all-accounts.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [AllAccountsComponent],
    imports: [
        CommonModule,
        AllAccountsRoutingModule,
        MatTableModule,
        MatCardModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class AllAccountsModule { }
