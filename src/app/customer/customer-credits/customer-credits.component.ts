import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Account} from '../../model/Account';
import {CustomerService} from '../services/customer.service';
import {finalize} from 'rxjs/operators';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {TitleService} from '../../title/title.service';

@Component({
    selector: 'app-customer-credits',
    templateUrl: './customer-credits.component.html',
    styleUrls: ['./customer-credits.component.scss']
})
export class CustomerCreditsComponent implements OnInit {

    public readonly MAX_CREDIT: number = 100_000.00;
    public readonly  MIN_CREDIT: number = 1_000.00;
    public balance: number = 0;

    creditsForm = new FormGroup({
        creditsField: new FormControl(
            '',
            [
                Validators.required,
                Validators.min(this.MIN_CREDIT),
                Validators.max(this.MAX_CREDIT)
            ])
    });


    constructor(
        private activatedRoute: ActivatedRoute,
        private customerService: CustomerService,
        private progressBar: ManualProgressBarService,
        private titleService: TitleService
    ) {
    }

    ngOnInit(): void {
        this.titleService.append('Purchase Credits | Dashboard');
        this.activatedRoute.data.subscribe((data: { account: Account }) => {
            this.balance = data.account.credit;
        });
    }

    onSubmit() {
        this.progressBar.status = true;
        this.customerService.purchaseCredits(this.creditsField.value)
            .pipe(finalize(() => this.progressBar.status = false))
            .subscribe((account: Account) => this.balance = account.credit);
    }

    get creditsField(): AbstractControl {
        return this.creditsForm.get('creditsField');
    }

}
