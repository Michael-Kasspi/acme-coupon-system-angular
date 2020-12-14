import {Component, OnInit} from '@angular/core';
import {TitleService} from '../title/title.service';
import {AdminService} from './services/admin.service';
import {CategoryManagerService} from '../category/category-manager/category-manager.service';
import {CategoryNameAsyncValidatorService} from '../category/category-form/category-name-async-validator.service';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [AdminService, CategoryManagerService, CategoryNameAsyncValidatorService]
})
export class AdminComponent implements OnInit {

    constructor(
        private titleService: TitleService,
        private adminService: AdminService,
        private categoryManagerService: CategoryManagerService,
        private categoryNameAsyncValidatorService :CategoryNameAsyncValidatorService
    ) {
        categoryManagerService.client = adminService;
        categoryNameAsyncValidatorService.categoryManagerService = categoryManagerService;
    }

    ngOnInit(): void {
        this.titleService.append('Admin | Dashboard');
    }

}
