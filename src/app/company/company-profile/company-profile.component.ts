import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../model/Company';
import {CompanyService} from '../services/company.service';
import {filter, finalize, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {CompanyProfileFormComponent} from '../components/company-profile-form/company-profile-form.component';

@Component({
    selector: 'app-company-profile',
    templateUrl: './company-profile.component.html',
    styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {


    public company: Company = null;
    public uploadProgressPercentage: number = undefined;

    @ViewChild(CompanyProfileFormComponent)
    private profileForm: CompanyProfileFormComponent = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private companyService: CompanyService,
        private snackBar: MatSnackBar,
        private progressBar: ManualProgressBarService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.parent.parent.data.subscribe((data: { company: Company }) => {
            this.company = data.company;
        });
    }

    public update(company: Company) {
        this.progressBar.status = true;
        this.profileForm.processing = true;
        this.companyService.updateCompany(company)
            .pipe(finalize(() => {
                this.progressBar.status = false;
                this.profileForm.processing = false;
            }))
            .subscribe(company => {
                this.company.deserialize(company);
                this.profileForm.initProfileForm();
                this.snackBar.open('The profile has been updated successfully');
            });
    }

    public uploadLogo(image: File) {
        const imageUrl = this.company.imageUrl;
        this.company.imageUrl = null;
        this.companyService.uploadCompanyLogo(image).pipe(
            tap((event: HttpEvent<Company>) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.uploadProgressPercentage = Math.round(100 * event.loaded / event.total);
                }
            }),
            filter((event: HttpEvent<Company>) => event.type === HttpEventType.Response),
            map((event: HttpEvent<Company>) => new Company((event as HttpResponse<Company>).body)),
        ).subscribe(company => {
            this.company.imageUrl = company.imageUrl;
            this.company.imagePreview = null;
            this.uploadProgressPercentage = undefined;
            this.snackBar.open('The image has been uploaded successfully');
        }, error => {
            this.company.imageUrl = imageUrl;
            this.company.imagePreview = null;
        });
    }

    public setImagePreview(preview: string) {
        this.company.imagePreview = preview;
    }
}
