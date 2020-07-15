import {Component, Input, OnInit} from '@angular/core';
import {UserType} from '../../../model/UserType';

@Component({
    selector: 'app-account-manager-form',
    templateUrl: './account-manager-form.component.html',
    styleUrls: ['./account-manager-form.component.scss']
})
export class AccountManagerFormComponent implements OnInit {

    public readonly PASSWORD_MIN_CHAR: number = 4;
    public readonly PASSWORD_MAX_CHAR: number = 25;
    public readonly NAME_MIN_CHAR: number = 3;
    public readonly NAME_MAX_CHAR: number = 25;

    @Input()
    public readonly USER_TYPES: string[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];

    public readonly ADMIN: string = UserType.ADMIN;
    public readonly COMPANY: string = UserType.COMPANY;
    public readonly CUSTOMER: string = UserType.CUSTOMER;

    public showPassword: boolean = false;
    public userType: string = null;

    constructor() {
    }

    ngOnInit(): void {
    }

}
