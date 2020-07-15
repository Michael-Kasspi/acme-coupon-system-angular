import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccountComponent } from './edit-account.component';

const routes: Routes = [
    { path: '', component: EditAccountComponent },
    { path: ':id', component: EditAccountComponent }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAccountRoutingModule { }
