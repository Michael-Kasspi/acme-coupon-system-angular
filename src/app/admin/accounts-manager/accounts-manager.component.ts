import {Component, OnInit} from '@angular/core';
import {TitleService} from '../../title/title.service';

@Component({
    selector: 'app-accounts-manager',
    templateUrl: './accounts-manager.component.html',
    styleUrls: ['./accounts-manager.component.scss']
})
export class AccountsManagerComponent implements OnInit {

    constructor(private titleService: TitleService) {
    }

    ngOnInit(): void {
        this.titleService.append('Account Manager | Dashboard');
    }

}
