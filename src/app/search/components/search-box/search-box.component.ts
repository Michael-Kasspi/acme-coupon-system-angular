import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent implements OnInit {

    searchForm: FormGroup = new FormGroup({
        'search': new FormControl('')
    });

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParamMap.subscribe(params => {
            const query = params.get('query');
            this.search.setValue(query);
        });
    }

    get search(): AbstractControl {
        return this.searchForm.get('search');
    }

    public makeSearchRequest() {
        const query = this.search.value;
        const advanced = SearchBoxComponent.testForAdvancedSearch(query);
        this.router.navigate(
            ['/search'],
            {
                queryParams: {query: query, page: 0, advanced: advanced},
                queryParamsHandling: 'merge'
            }
        );
    }

    private static testForAdvancedSearch(query: string): boolean {
        if (!query) {
            return false;
        }
        const special = /[+\-&|!(){}\[\]^"~*?:\\]/;
        return special.test(query);
    }
}
