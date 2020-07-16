import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AddAccountComponent} from './add-account.component';
import {CanDeactivateGuard} from '../../../can-deactivate/can-deactivate.guard';

const routes: Routes = [{path: '', component: AddAccountComponent, canDeactivate: [CanDeactivateGuard]}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddAccountRoutingModule {
}
