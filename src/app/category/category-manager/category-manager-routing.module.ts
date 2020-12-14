import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CategoryManagerComponent} from './category-manager.component';
import {CanDeactivateGuard} from '../../can-deactivate/can-deactivate.guard';

const routes: Routes = [
    {
        path: '',
        component: CategoryManagerComponent,
        canDeactivate: [CanDeactivateGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryManagerRoutingModule {
}
