import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import {CouponListItemModule} from '../coupon/components/coupon-list-item/coupon-list-item.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
    PriceValidator,
    SearchFilterFormComponent,
    ValueExistsValidator
} from './components/search-filter-form/search-filter-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRippleModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [SearchComponent, SearchFilterFormComponent, ValueExistsValidator, PriceValidator],
    imports: [
        CommonModule,
        SearchRoutingModule,
        CouponListItemModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatRippleModule,
        MatCheckboxModule,
        DragDropModule,
        FormsModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatDialogModule
    ]
})
export class SearchModule { }
