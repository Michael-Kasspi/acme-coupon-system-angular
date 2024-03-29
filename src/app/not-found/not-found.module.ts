import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotFoundRoutingModule} from './not-found-routing.module';
import {NotFoundComponent} from './not-found.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [NotFoundComponent],
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule
    ]
})
export class NotFoundModule { }
