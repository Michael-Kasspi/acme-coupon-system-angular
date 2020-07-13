import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FileUploadDialogComponent} from '../../../dialog/file-upload-dialog/file-upload-dialog.component';
import {Coupon} from '../../../model/Coupon';
import {Category} from '../../../model/Category';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EndpointService} from '../../../endpoint/endpoint.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-coupon-form',
    templateUrl: './coupon-form.component.html',
    styleUrls: ['./coupon-form.component.scss']
})
export class CouponFormComponent implements OnInit {

    readonly ADD_CONTROLS: string = 'add';
    readonly EDIT_CONTROLS: string = 'edit';
    readonly DEFAULT_CONTROLS: string = this.ADD_CONTROLS;

    @Input()
    controls: string = this.DEFAULT_CONTROLS;

    @Input()
    coupon: Coupon = new Coupon();

    @Input()
    categories: Category[] = null;

    image: File = null;

    couponForm: FormGroup = null;

    minDate: Date = new Date();

    processing: boolean = false;

    @Input()
    progress: number = undefined;

    @Output()
    resetEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    saveEvent: EventEmitter<Coupon> = new EventEmitter();

    @Output()
    updateEvent: EventEmitter<Coupon> = new EventEmitter();

    @Output()
    deleteEvent: EventEmitter<Coupon> = new EventEmitter();

    @Output()
    imageBrowseEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    imageSelectedEvent: EventEmitter<File> = new EventEmitter();

    @Output()
    imageDeleteEvent: EventEmitter<Coupon> = new EventEmitter();

    constructor(
        public dialog: MatDialog,
        public router: Router,
        public endpoint: EndpointService
    ) {
    }

    ngOnInit(): void {
        this.initCoupon();
    }

    initCoupon(): void {
        this.couponForm = new FormGroup({
            'title': new FormControl(
                this.coupon.title || '',
                [Validators.required, Validators.min(3), Validators.max(100)]
            ),
            'description': new FormControl(
                this.coupon.description || '',
                [Validators.max(250)]
            ),
            'category': new FormControl(
                this.coupon.category, Validators.required
            ),
            'price': new FormControl(this.coupon.price || (this.coupon.id === 0 ? '' : 0),
                [Validators.required, Validators.min(0)]
            ),
            'amount': new FormControl(
                this.coupon.amount || (this.coupon.id === 0 ? '' : 0),
                [Validators.required, Validators.min(0)]
            ),
            'startDate': new FormControl(
                {value: this.coupon.startDate || new Date(), disabled: true},
                [Validators.required]
            ),
            'endDate': new FormControl(
                this.coupon.endDate || '',
                [Validators.required]
            ),
        });
    }

    openImageSelectDialog() {
        this.imageBrowseEvent.emit();
        const dialogRef = this.configDialog();
        const subscription = this.deleteImageListener(dialogRef);
        dialogRef.afterClosed()
            .subscribe(file => {
                subscription.unsubscribe();
                if (file) {
                    this.uploadImage(file);
                }
            });
    }

    private deleteImageListener(dialogRef): Subscription {
        return dialogRef.componentInstance.deleteFileEvent.pipe(first())
            .subscribe(event => {
                this.coupon.imagePreview = null;
                this.imageDeleteEvent.emit(this.coupon);
            });
    }

    private configDialog() {
        return this.dialog.open(
            FileUploadDialogComponent,
            {
                data: {
                    currentImageUrl: this.coupon.imageUrl,
                    imagePreview: this.coupon.imagePreview,
                    action: this.controls === this.ADD_CONTROLS ? 'Select' : null
                }
            }
        );
    }

    save() {
        this.saveEvent.emit(Object.assign(this.coupon, this.couponForm.getRawValue()));
    }

    reset() {
        this.coupon.imagePreview = null;
        this.initCoupon();
    }

    delete() {
        this.deleteEvent.emit(this.coupon);
    }

    update() {
        this.updateEvent.emit(Object.assign(this.coupon, this.couponForm.getRawValue()));
    }

    currentCategory(current: Category, selected: Category) {
        if (selected) {
            return current.id === selected.id;
        }
        return false;
    }

    viewPage() {
        this.router.navigate([`/coupons/page/${this.coupon.id}`]);
    }

    private uploadImage(file) {
        this.image = file;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.image);
        fileReader.addEventListener('load', ev => {
            const result = fileReader.result;
            if (typeof result === 'string') {
                this.coupon.imagePreview = result;
            }
        });
        this.coupon.imageUrl = null;
        this.imageSelectedEvent.emit(file);
    }

    get imageUrl() {
        const imageUrl = this.coupon.imageUrl;

        if (imageUrl) {
            return `${this.endpoint.res}${imageUrl}`;
        }

        return this.coupon.imagePreview || '';
    }

    get title(): AbstractControl {
        return this.couponForm.get('title');
    }

    get description(): AbstractControl {
        return this.couponForm.get('description');
    }

    get category(): AbstractControl {
        return this.couponForm.get('category');
    }

    get price(): AbstractControl {
        return this.couponForm.get('price');
    }

    get amount(): AbstractControl {
        return this.couponForm.get('amount');
    }

    get startDate(): AbstractControl {
        return this.couponForm.get('startDate');
    }

    get endDate(): AbstractControl {
        return this.couponForm.get('endDate');
    }
}
