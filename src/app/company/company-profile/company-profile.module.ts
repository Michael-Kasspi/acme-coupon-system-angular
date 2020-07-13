import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { CompanyProfileComponent } from './company-profile.component';
import {CompanyProfileFormModule} from '../components/company-profile-form/company-profile-form.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [CompanyProfileComponent],
    imports: [
        CommonModule,
        CompanyProfileRoutingModule,
        CompanyProfileFormModule,
        MatCardModule
    ]
})
export class CompanyProfileModule { }
