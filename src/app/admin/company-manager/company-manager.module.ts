import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyManagerRoutingModule} from './company-manager-routing.module';
import {CompanyManagerComponent} from './company-manager.component';
import {AddCompanyComponent} from './components/add-company/add-company.component';
import {AllCompaniesComponent} from './components/all-companies/all-companies.component';
import {EditCompanyComponent} from './components/edit-company/edit-company.component';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
    declarations: [
        CompanyManagerComponent,
        AddCompanyComponent,
        AllCompaniesComponent,
        EditCompanyComponent
    ],
    imports: [
        CommonModule,
        CompanyManagerRoutingModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        TextFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule
    ]
})
export class CompanyManagerModule {
}
