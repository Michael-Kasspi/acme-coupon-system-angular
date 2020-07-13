import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Account} from '../../model/Account';
import {CustomerService} from '../services/customer.service';
import {finalize} from 'rxjs/operators';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';

@Component({
    selector: 'app-customer-credits',
    templateUrl: './customer-credits.component.html',
    styleUrls: ['./customer-credits.component.scss']
})
export class CustomerCreditsComponent implements OnInit {

    balance: number = 0;

    creditsForm = new FormGroup({
        creditsField: new FormControl(
            1_000,
            [
                Validators.required,
                Validators.min(1_000),
                Validators.max(100_000)
            ])
    });


    constructor(
        public activatedRoute: ActivatedRoute,
        public customerService: CustomerService,
        public progressBar: ManualProgressBarService
    ) {
    }

    ngOnInit(): void {
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
