import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Company} from '../../../../model/Company';
import {EndpointService} from '../../../../endpoint/endpoint.service';

@Component({
    selector: 'app-all-companies',
    templateUrl: './all-companies.component.html',
    styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit, AfterViewInit {

    @Input()
    companies: Company[] = null;

    @ViewChild('companiesTable')
    companiesTable: MatTable<Company>;

    @Output()
    tableRef: EventEmitter<MatTable<Company>> = new EventEmitter();

    @Output()
    onCompanyClick: EventEmitter<Company> = new EventEmitter();

    displayedColumns: string[] = ['name', 'description', 'imageUrl'];

    constructor(public endpoint: EndpointService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.tableRef.emit(this.companiesTable);
    }

    selectCompany(company: Company){
        this.onCompanyClick.emit(company);
    }

}
