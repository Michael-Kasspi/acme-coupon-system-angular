import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LogoutComponent} from './logout.component';
import {LogoutGuard} from './guards/logout.guard';

const routes: Routes = [{path: '', canActivate: [LogoutGuard], component: LogoutComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogoutRoutingModule {
}
