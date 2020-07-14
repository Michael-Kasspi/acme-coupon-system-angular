import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../model/Company';
import {EndpointService} from '../endpoint/endpoint.service';
import {TitleService} from '../title/title.service';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

    company: Company = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private endpoint: EndpointService,
        private titleService: TitleService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { company: Company }) => {
            this.company = data.company;
            if (this.company && this.company.name) {
                this.titleService.append(`${this.company.name} | Dashboard`)
            }
        });
    }

    get companyImageUrl(): string {
        if (this.company && this.company.imageUrl) {
            return `${this.endpoint.res}${this.company.imageUrl}`;
        }
        return '';
    }
}
