import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserType} from '../../../model/UserType';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../model/Account';
import {MatSelectChange} from '@angular/material/select';

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
    public readonly COMPANY_NAME_MIN_CHAR: number = 4;
    public readonly COMPANY_NAME_MAX_CHAR: number = 50;
    public readonly COMPANY_DESC_MAX_CHAR: number = 250;

    @Input() public readonly USER_TYPES: string[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];

    public readonly MODE_ADD: string = 'add';
    public readonly MODE_UPDATE: string = 'update';
    public readonly MODE_DEFAULT: string = this.MODE_ADD;

    @Input() public readonly MODE: string = this.MODE_DEFAULT;
    @Input() public readonly actionText: string = null;

    public readonly ADMIN: string = UserType.ADMIN;
    public readonly COMPANY: string = UserType.COMPANY;
    public readonly CUSTOMER: string = UserType.CUSTOMER;

    public showPassword: boolean = false;
    public userType: string = null;

    @Input() private account: Account = new Account();
    public accountForm: FormGroup = null;
    public companyForm: FormGroup = null;
    public adminForm: FormGroup = null;

    @Output() public deleteEvent: EventEmitter<any> = new EventEmitter();
    @Output() private saveEvent: EventEmitter<Account> = new EventEmitter();
    @Output() private updateEvent: EventEmitter<Account> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
        this.initForm();
    }

    public initForm(): void {
        this.accountForm = new FormGroup({
            'firstName': new FormControl('',
                [
                    Validators.required,
                    Validators.min(this.NAME_MIN_CHAR),
                    Validators.max(this.NAME_MAX_CHAR),
                ]
            ),
            'lastName': new FormControl('',
                [
                    Validators.required,
                    Validators.min(this.NAME_MIN_CHAR),
                    Validators.max(this.NAME_MAX_CHAR),
                ]
            ),
            'email': new FormControl('',
                [
                    Validators.required,
                    Validators.email
                ]
            ),
            'password': new FormControl('',
                [
                    Validators.required,
                    Validators.min(this.PASSWORD_MIN_CHAR),
                    Validators.max(this.PASSWORD_MAX_CHAR),
                ]
            ),
            'user': new FormGroup({}),
        });
    }

    public onActionClick(): void {
        const account = new Account(this.accountForm.value);
        if (this.MODE === this.MODE_ADD) {
            this.saveEvent.emit(account);
        } else {
            this.updateEvent.emit(account);
        }
    }

    public onUserSelect(selectChange: MatSelectChange) {
        const userType = selectChange.value;
        this.accountForm.setControl('user', this.getUserControls(userType));
        this.userType = userType;
    }

    private getUserControls(userType) {
        switch (userType) {
            case this.ADMIN:
                return this.adminForm = this.adminControls;
            case this.COMPANY:
                return this.companyForm = this.companyControls;
            case this.CUSTOMER:
                return AccountManagerFormComponent.getTypeControl(this.CUSTOMER);
        }
    }

    private get adminControls(): FormGroup {
        return new FormGroup({
            'type': AccountManagerFormComponent.getTypeControl(this.ADMIN),
            'main': new FormControl('',
                [Validators.max(this.COMPANY_DESC_MAX_CHAR)]
            ),
        });
    }

    private get companyControls(): FormGroup {
        return new FormGroup({
            'type': AccountManagerFormComponent.getTypeControl(this.COMPANY),
            'name': new FormControl('',
                [
                    Validators.required,
                    Validators.min(this.COMPANY_NAME_MIN_CHAR),
                    Validators.max(this.COMPANY_NAME_MAX_CHAR),
                ]
            ),
            'description': new FormControl('',
                [Validators.max(this.COMPANY_DESC_MAX_CHAR)]
            ),
        });
    }

    private static getTypeControl(type: string): AbstractControl {
        return new FormControl(type, [Validators.required]);
    }
}
