import {Component, OnInit} from '@angular/core';
import {TitleService} from '../title/title.service';
import {AdminService} from './services/admin.service';
import {CategoryManagerService} from '../category-manager/category-manager.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [AdminService, CategoryManagerService]
})
export class AdminComponent implements OnInit {

    constructor(
        private titleService: TitleService,
        private adminService: AdminService,
        private categoryManagerService: CategoryManagerService,
    ) {
        categoryManagerService.client = adminService;
    }

    ngOnInit(): void {
        this.titleService.append('Admin | Dashboard');
    }

}
