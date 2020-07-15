import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatExpansionPanel} from '@angular/material/expansion';
import {finalize, map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {ManualProgressBarService} from '../../../progress-bar/manual-progress-bar.service';
import {EmailValidatorService} from '../../validators/email-validator.service';
import {AccountService} from '../../services/account.service';
import {Account} from '../../../model/Account';
import {WarningDialogComponent} from '../../../dialog/warning-dialog/warning-dialog.component';
import {AccountDetailsService} from '../../services/account-details.service';

@Component({
    selector: 'app-account-form',
    templateUrl: './account-form.component.html',
    styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit, AfterViewInit {

    /*active panels*/
    readonly NO_ACTIVE_PANEL = 0;
    readonly PERSONAL_INFO: number = 1;
    readonly CREDENTIALS: number = 2;

    /*form control names*/
    readonly FIRST_NAME: string = 'firstName';
    readonly LAST_NAME: string = 'lastName';
    readonly EMAIL: string = 'email';
    readonly CURRENT_PASSWORD: string = 'currentPassword';
    readonly NEW_PASSWORD: string = 'newPassword';

    public readonly NAME_LENGTH_MIN: number = 3;
    public readonly NAME_LENGTH_MAX: number = 25;
    public readonly PASSWORD_LENGTH_MIN: number = 4;
    public readonly PASSWORD_LENGTH_MAX: number = 25;

    @Input()
    account: Account = null;

    /*panel refs*/
    @ViewChild('epPersonalInfo')
    epPersonalInfo: MatExpansionPanel = null;
    @ViewChild('epCredentials')
    epCredentials: MatExpansionPanel = null;

    /*toggles*/
    hideCurrent: boolean = true;
    hideNew: boolean = true;
    isNewPassword: boolean = false;
    saveInProgress = false;

    /*active panels*/
    activePanel: number = this.NO_ACTIVE_PANEL;
    onChangesSubject$: Subject<number> = new Subject<number>();

    /*form groups*/
    personalInfo: FormGroup = null;
    credentials: FormGroup = null;

    constructor(
        private accountService: AccountService,
        private snackBar: MatSnackBar,
        private progressBarService: ManualProgressBarService,
        private dialogService: MatDialog,
        private emailValidator: EmailValidatorService,
        private accountDetailsService: AccountDetailsService
    ) {
    }

    initPersonalInfo() {
        this.personalInfo = new FormGroup({
            'firstName': new FormControl('', [
                Validators.required,
                Validators.minLength(this.NAME_LENGTH_MIN),
                Validators.maxLength(this.NAME_LENGTH_MAX)
            ]),
            'lastName': new FormControl('', [
                Validators.required,
                Validators.minLength(this.NAME_LENGTH_MIN),
                Validators.maxLength(this.NAME_LENGTH_MAX)
            ]),
        });
    }

    initCredentials() {
        this.credentials = new FormGroup({
            'currentPassword': new FormControl('', [
                Validators.required
            ]),
            'newPassword': new FormControl({value: '', disabled: true}, [
                Validators.required,
                Validators.minLength(this.PASSWORD_LENGTH_MIN),
                Validators.maxLength(this.PASSWORD_LENGTH_MAX),
            ]),
            'email': new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.email
                ],
                asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
                updateOn: 'blur'
            })
        });
    }

    ngOnInit(): void {
        this.initPersonalInfo();
        this.initCredentials();
        this.setFields();
    }

    ngAfterViewInit(): void {
        this.onFieldChanges();
    }

    onFieldChanges() {
        this.onPersonalInfoChanges$().subscribe(this.onChangesSubject$);
        this.onCredentialsChanges$().subscribe(this.onChangesSubject$);
        this.onChangesSubject$.subscribe(activePanel => this.activePanel = activePanel);
    }

    onPersonalInfoChanges$(): Observable<number> {
        return this.personalInfo.valueChanges
            .pipe(map(_ => this.PERSONAL_INFO));
    }

    onCredentialsChanges$(): Observable<number> {
        return this.credentials.valueChanges
            .pipe(map(_ => this.CREDENTIALS));
    }

    setCredentials(): void {
        this.credentials.reset({
            email: this.account.email,
            currentPassword: '',
            newPassword: {value: '', disabled: true},
        }, {onlySelf: true, emitEvent: false});
    }

    setPersonalInfo(): void {
        this.personalInfo.reset({
            firstName: this.account.firstName,
            lastName: this.account.lastName,
        }, {onlySelf: true, emitEvent: false});
    }

    setFields(): void {
        this.setCredentials();
        this.setPersonalInfo();
    }

    cancel() {
        this.setFields();
        this.enableAll();
    }

    savePersonalInfo(): void {
        this.save$(this.personalInfo.value).subscribe();
    }

    saveCredentials(): void {

        const credentials = {
            email: this.email.value,
            password: this.newPassword.value !== '' ? this.newPassword.value : null
        };

        this.save$(credentials, this.currentPassword.value).subscribe(value => {
            this.resetNewPassword();
        });
    }

    save$(credentials, password = ''): Observable<any> {

        this.progressBarService.status = this.saveInProgress = true;

        return this.accountService.updateAccount(credentials, password)
            .pipe(
                tap(account => {
                    this.account.deserialize(account);
                    this.accountDetailsService.account = this.account;
                    this.afterSaved();
                }), finalize(() => this.progressBarService.status = this.saveInProgress = false)
            );
    }

    afterSaved() {
        this.setFields();
        this.displayMessage();
        this.enableAll();
    }

    enableAll() {
        this.activePanel = this.NO_ACTIVE_PANEL;
    }

    toggleNewPassword() {

        this.isNewPassword = !this.isNewPassword;

        if (this.credentials.contains(this.NEW_PASSWORD)) {
            this.credentials.controls[this.NEW_PASSWORD].disable();
        } else {
            this.credentials.controls[this.NEW_PASSWORD].enable();
        }
    }

    resetNewPassword() {
        this.isNewPassword = false;
        this.credentials.controls[this.NEW_PASSWORD].disable(
            {onlySelf: true, emitEvent: false});
    }

    displayMessage(): void {
        this.snackBar.open('Changes have been saved successfully!');
    }

    displayDialog(tab: number) {
        if (this.activePanel === this.NO_ACTIVE_PANEL || this.activePanel !== tab) {
            return;
        }

        /*prevent panel from closing*/
        switch (this.activePanel) {
            case this.PERSONAL_INFO:
                this.epPersonalInfo.open();
                break;
            case this.CREDENTIALS:
                this.epCredentials.open();
                break;
        }

        this.discardChangesDialog().subscribe(discard => {
            if (discard) {
                this.cancel();
            }
        });
    }

    discardChangesDialog(): Observable<boolean> {
        return this.dialogService.open(WarningDialogComponent, {
            data: {
                title: 'Confirm discard changes',
                body: 'Are you sure you want to discard changes?',
                action: 'Discard'
            }
        }).afterClosed();
    }

    public canDeactivate(): boolean | Observable<boolean> {

        if (this.activePanel === this.NO_ACTIVE_PANEL) {
            return true;
        }

        this.progressBarService.status = false;
        return this.discardChangesDialog().pipe(tap(discard => {
            this.progressBarService.status = discard;
        }));
    }

    get firstName(): AbstractControl {
        return this.personalInfo.get(this.FIRST_NAME);
    }

    get lastName(): AbstractControl {
        return this.personalInfo.get(this.LAST_NAME);
    }

    get email(): AbstractControl {
        return this.credentials.get(this.EMAIL);
    }

    get currentPassword(): AbstractControl {
        return this.credentials.get(this.CURRENT_PASSWORD);
    }

    get newPassword(): AbstractControl {
        return this.credentials.get(this.NEW_PASSWORD);
    }
}
