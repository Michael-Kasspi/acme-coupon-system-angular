import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-add-company',
    templateUrl: './add-company.component.html',
    styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

    companyDetails: FormGroup = null;

    @Output()
    onCompanyAdd: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
        this.initCompanyDetails();
    }

    initCompanyDetails(): void {
        this.companyDetails = new FormGroup({
            'name': new FormControl('', [Validators.required]),
            'description': new FormControl('')
        })
    }

    addCompany(): void {
        console.log(this.companyDetails.value);
        this.onCompanyAdd.emit(this.companyDetails.value);
    }

    get name(): AbstractControl {
        return this.companyDetails.get('name');
    }

    get description(): AbstractControl {
        return this.companyDetails.get('description');
    }
}
