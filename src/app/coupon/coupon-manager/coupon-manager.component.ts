import {Component, OnInit} from '@angular/core';
import {TitleService} from '../../title/title.service';

@Component({
    selector: 'app-coupon-manager',
    templateUrl: './coupon-manager.component.html',
    styleUrls: ['./coupon-manager.component.scss']
})
export class CouponManagerComponent implements OnInit {

    constructor(private titleService: TitleService) {}

    ngOnInit(): void {
        this.titleService.append('Coupon Manager');
    }
}
