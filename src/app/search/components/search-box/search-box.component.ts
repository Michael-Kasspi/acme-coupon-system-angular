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
        })
    }

    get search(): AbstractControl {
        return this.searchForm.get('search');
    }

    public makeSearchRequest() {
        this.router.navigate(
            ['/search'],
            {queryParams: {query: this.search.value, page: 0}, queryParamsHandling: 'merge'}
        );
    }
}
