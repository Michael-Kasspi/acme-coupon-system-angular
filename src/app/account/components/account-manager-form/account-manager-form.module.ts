import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagerFormComponent } from './account-manager-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
    declarations: [AccountManagerFormComponent],
    exports: [
        AccountManagerFormComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatDividerModule,
        MatSlideToggleModule
    ]
})
export class AccountManagerFormModule { }
