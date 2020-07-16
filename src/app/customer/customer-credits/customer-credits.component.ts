import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Account} from '../../model/Account';
import {CustomerService} from '../services/customer.service';
import {finalize} from 'rxjs/operators';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {TitleService} from '../../title/title.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountDetailsService} from '../../account/services/account-details.service';

@Component({
    selector: 'app-customer-credits',
    templateUrl: './customer-credits.component.html',
    styleUrls: ['./customer-credits.component.scss']
})
export class CustomerCreditsComponent implements OnInit {

    public readonly MAX_CREDIT: number = 100_000.00;
    public readonly MIN_CREDIT: number = 1_000.00;
    public balance: number = 0;

    public creditsForm: FormGroup = null;
    public purchasing: boolean = false;

    @ViewChild('formGrpDirective')
    formGrpDirective: FormGroupDirective = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private customerService: CustomerService,
        private progressBar: ManualProgressBarService,
        private titleService: TitleService,
        private snackBar: MatSnackBar,
        private accountDetailsService: AccountDetailsService
    ) {
    }

    ngOnInit(): void {
        this.initCredits();
        this.titleService.append('Purchase Credits | Dashboard');
        this.activatedRoute.data.subscribe((data: { account: Account }) => {
            this.balance = data.account.credit;
        });
    }

    public onSubmit() {
        const amount = this.creditsField.value;
        if (!amount || typeof amount !== 'number') {
            return;
        }
        this.progressBar.status = true;
        this.purchasing = true;
        this.customerService.purchaseCredits(amount)
            .pipe(finalize(() => {
                this.progressBar.status = false;
                this.purchasing = false;
            }))
            .subscribe((account: Account) => {
                this.accountDetailsService.account = account;
                this.balance = account.credit;
                this.snackBar.open(`${amount} credits have been added to the account`);
                this.creditsField.reset('');
                this.formGrpDirective.resetForm();
            });
    }

    public resetIfEmpty() {
        if (!this.creditsField.value) {
            this.formGrpDirective.resetForm();
        }
    }

    private initCredits(): void {
        this.creditsForm = new FormGroup({
            creditsField: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.min(this.MIN_CREDIT),
                    Validators.max(this.MAX_CREDIT)
                ])
        });
    }

    get creditsField(): AbstractControl {
        return this.creditsForm.get('creditsField');
    }
}
