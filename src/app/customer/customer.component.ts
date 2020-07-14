import { Component, OnInit } from '@angular/core';
import {TitleService} from '../title/title.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
      this.titleService.append('Customer | Dashboard');
  }

}
