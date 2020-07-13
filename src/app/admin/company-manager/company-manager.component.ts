import {Component, OnInit} from '@angular/core';
import {Company} from '../../model/Company';
import {MatTable} from '@angular/material/table';
import {AdminService} from '../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {AddCompanyComponent} from './components/add-company/add-company.component';
import {EditCompanyComponent} from './components/edit-company/edit-company.component';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-company-manager',
    templateUrl: './company-manager.component.html',
    styleUrls: ['./company-manager.component.scss']
})
export class CompanyManagerComponent implements OnInit {

    readonly ADD_COMPANY = 0;
    readonly EDIT_COMPANY = 1;
    readonly ALL_COMPANIES = 2;
    readonly DEFAULT_TAB = this.ADD_COMPANY;

    activeTab: number = this.DEFAULT_TAB;
    selectedCompany: Company = null;
    companies: Company[] = null;
    tableRef: MatTable<Company> = null;

    constructor(
        private adminService: AdminService,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute,
        private progressBarService: ManualProgressBarService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { companies: Company[] }) => {
            this.companies = data.companies;
        });
    }

    addCompany(company: any, addCompanyComponent: AddCompanyComponent): void {
        this.progressBarService.status = true;
        this.adminService.addCompany(company)
            .pipe(finalize(() => this.progressBarService.status = false))
            .subscribe(companyJson => {
                let company = this.selectedCompany = new Company(companyJson);
                this.companies.push(company);
                this.tableRef.renderRows();
                this.snackBar.open('The company has been saved successfully');
                addCompanyComponent.companyDetails.reset();
                this.activeTab = this.EDIT_COMPANY;
            });
    }

    deleteCompany(id: number, editCompanyComponent: EditCompanyComponent): void {
        this.progressBarService.status = true;
        this.adminService.deleteCompany(id)
            .pipe(finalize(() => this.progressBarService.status = false))
            .subscribe(value => {
                let index = this.companies.findIndex(company => company.id === id);
                this.companies.splice(index, 1);
                editCompanyComponent.company = null;
                this.tableRef.renderRows();
                this.snackBar.open('The company has been deleted successfully');
                this.activeTab = this.ALL_COMPANIES;
            });
    }

    updateCompany(company: any) {
        this.progressBarService.status = true;
        this.adminService.updateCompany(company)
            .pipe(finalize(() => this.progressBarService.status = false))
            .subscribe(company => {
            let companyFound = this.companies.find(companyIter => companyIter.id === company.id);
            if (companyFound) {
                companyFound.deserialize(company);
            }
            this.tableRef.renderRows();
            this.snackBar.open('The company has been updated successfully');
        });
    }

    setTableRef(tableRef: MatTable<Company>) {
        this.tableRef = tableRef;
    }

    editCompany(company: Company) {
        this.selectedCompany = company;
        this.activeTab = this.EDIT_COMPANY;
    }

}
