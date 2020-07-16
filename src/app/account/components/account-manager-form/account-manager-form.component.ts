import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserType} from '../../../model/UserType';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../model/Account';
import {MatSelectChange} from '@angular/material/select';
import {Company} from '../../../model/Company';
import {Admin} from '../../../model/Admin';
import {EmailValidatorPublicService} from '../../validators/email-validator-public.service';

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

    @Input() public readonly userTypes: string[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];

    public readonly MODE_ADD: string = 'add';
    public readonly MODE_EDIT: string = 'edit';
    public readonly MODE_DEFAULT: string = this.MODE_ADD;

    @Input() public mode: string = this.MODE_DEFAULT;
    @Input() public actionText: string = null;

    public readonly ADMIN: string = UserType.ADMIN;
    public readonly COMPANY: string = UserType.COMPANY;
    public readonly CUSTOMER: string = UserType.CUSTOMER;

    public showPassword: boolean = false;
    public userType: string = null;

    @Input() public account: Account = new Account();
    @Input() processing: boolean = false;
    public accountForm: FormGroup = null;
    public companyForm: FormGroup = null;
    public adminForm: FormGroup = null;

    @Output() public deleteEvent: EventEmitter<Account> = new EventEmitter();
    @Output() private saveEvent: EventEmitter<Account> = new EventEmitter();
    @Output() private updateEvent: EventEmitter<Account> = new EventEmitter();

    constructor(private emailValidator: EmailValidatorPublicService,) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    public onActionClick(): void {
        const account = new Account(this.accountForm.value);
        account.id = this.account.id;

        if (this.mode === this.MODE_ADD) {
            this.saveEvent.emit(account);
        } else {
            this.updateEvent.emit(account);
        }
    }

    public onUserSelect(selectChange: MatSelectChange) {
        this.selectUser(selectChange.value);
    }

    public get firstName(): AbstractControl {
        return this.accountForm.get('firstName');
    }

    public get lastName(): AbstractControl {
        return this.accountForm.get('lastName');
    }

    public get email(): AbstractControl {
        return this.accountForm.get('email');
    }

    public get password(): AbstractControl {
        return this.accountForm.get('password');
    }

    public get main(): AbstractControl {
        return this.adminForm.get('main');
    }

    public get name(): AbstractControl {
        return this.companyForm.get('name');
    }

    public get description(): AbstractControl {
        return this.companyForm.get('description');
    }

    public get userTypeControl(): AbstractControl {
        return this.accountForm.get('userType');
    }

    public reset() {
        this.initForm();
        this.userType = this.userTypeControl.value;
    }

    private initForm() {
        this.initAccountForm();
        if (this.account) {
            if (this.account.user) {
                this.selectUser(this.account.user.type);
            }
            if (this.account.email) {
                this.emailValidator.currentEmail = this.account.email;
            }
        }
    }

    private selectUser(userType) {
        this.accountForm.setControl('user', this.getUserControls(userType));
        this.userType = userType;
    }

    private initAccountForm(): void {
        this.accountForm = new FormGroup({
            'firstName': new FormControl(this?.account?.firstName || '',
                [
                    Validators.required,
                    Validators.minLength(this.NAME_MIN_CHAR),
                    Validators.maxLength(this.NAME_MAX_CHAR),
                ]
            ),
            'lastName': new FormControl(this?.account?.lastName || '',
                [
                    Validators.required,
                    Validators.minLength(this.NAME_MIN_CHAR),
                    Validators.maxLength(this.NAME_MAX_CHAR),
                ]
            ),
            'email': new FormControl(this?.account?.email || '', {
                    validators: [
                        Validators.required,
                        Validators.email
                    ],
                    asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
                    updateOn: 'blur'
                }
            ),
            'password': new FormControl(this?.account?.password || '',
                this.getPasswordValidators()
            ),
            'userType': new FormControl({
                    value: this?.account?.user?.type || '',
                    disabled: !!this?.account?.user?.id
                },
                [Validators.required]
            ),
        });
    }

    private getPasswordValidators() {
        const validatorFns = [
            Validators.minLength(this.PASSWORD_MIN_CHAR),
            Validators.maxLength(this.PASSWORD_MAX_CHAR),
        ];
        if (!this?.account?.id) {
            validatorFns.push(Validators.required);
        }
        return validatorFns;
    }

    private getUserControls(userType) {
        switch (userType) {
            case this.ADMIN:
                return this.adminForm = this.adminControls;
            case this.COMPANY:
                return this.companyForm = this.companyControls;
            case this.CUSTOMER:
                return this.customerControls;
        }
    }

    private get adminControls(): FormGroup {
        return new FormGroup({
            'type': AccountManagerFormComponent.getTypeControl(this.ADMIN),
            'main': new FormControl((this?.account?.user as Admin)?.main || false,
                [Validators.maxLength(this.COMPANY_DESC_MAX_CHAR)]
            ),
        });
    }

    private get companyControls(): FormGroup {
        return new FormGroup({
            'type': AccountManagerFormComponent.getTypeControl(this.COMPANY),
            'name': new FormControl((this?.account?.user as Company)?.name || '',
                [
                    Validators.required,
                    Validators.minLength(this.COMPANY_NAME_MIN_CHAR),
                    Validators.maxLength(this.COMPANY_NAME_MAX_CHAR),
                ]
            ),
            'description': new FormControl((this?.account?.user as Company)?.description || '',
                [Validators.maxLength(this.COMPANY_DESC_MAX_CHAR)]
            ),
        });
    }

    private get customerControls(): FormGroup {
        return new FormGroup({
            'type': AccountManagerFormComponent.getTypeControl(this.CUSTOMER),
        });
    }

    private static getTypeControl(type: string): AbstractControl {
        return new FormControl(type, [Validators.required]);
    }
}
