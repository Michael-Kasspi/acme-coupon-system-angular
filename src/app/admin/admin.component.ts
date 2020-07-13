import { Component, OnInit } from '@angular/core';
import {TitleService} from '../title/title.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    constructor(private titleService: TitleService) { }

    ngOnInit(): void {
        this.titleService.append('Admin | Dashboard');
    }

}
