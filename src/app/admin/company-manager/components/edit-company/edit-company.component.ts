import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from '../../../../model/Company';

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit, OnChanges {

    @Input()
    company: Company = null;

    @Input()
    companies: Company[] = null;

    companyDetails: FormGroup = null;

    @Output()
    onCompanyDelete: EventEmitter<any> = new EventEmitter();

    @Output()
    onCompanyUpdate: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    initCompanyDetails(): void {
        this.companyDetails = new FormGroup({
            'name': new FormControl(this.company?.name || '', [Validators.required]),
            'description': new FormControl(this.company?.description || '')
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.company) {
            this.initCompanyDetails();
        }
    }

    ngOnInit(): void {
        this.initCompanyDetails();
    }

    updateCompany() {
        let company = this.companyDetails.value;
        company.id = this.company.id;
        this.onCompanyUpdate.emit(company);
    }

    deleteCompany() {
        this.onCompanyDelete.emit(this.company.id);
    }

    get name(): AbstractControl {
        return this.companyDetails.get('name');
    }

    get description(): AbstractControl {
        return this.companyDetails.get('description');
    }
}
