import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchComponent} from './search.component';
import {SearchResolverService} from './resolvers/search-resolver.service';
import {SearchCompanyResolverService} from './resolvers/search-company-resolver.service';
import {SearchCategoryResolverService} from './resolvers/search-category-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: SearchComponent,
        resolve: {
            resultPage: SearchResolverService,
            companies: SearchCompanyResolverService,
            categories: SearchCategoryResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule {
}
