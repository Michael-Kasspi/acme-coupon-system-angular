import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../model/Company';
import {ImageManagerComponent} from '../../../image-manager/image-manager.component';

@Component({
    selector: 'app-company-profile-form',
    templateUrl: './company-profile-form.component.html',
    styleUrls: ['./company-profile-form.component.scss']
})
export class CompanyProfileFormComponent implements OnInit {

    public readonly ADD_CONTROLS: string = 'add';
    public readonly EDIT_CONTROLS: string = 'edit';
    public readonly DEFAULT_CONTROLS: string = this.ADD_CONTROLS;

    public readonly NAME_MIN_CHARS: number = 3;
    public readonly NAME_MAX_CHARS: number = 50;
    public readonly DESC_MAX_CHARS: number = 250;

    @Input()
    public controls: string = this.DEFAULT_CONTROLS;

    @Input()
    public company: Company = new Company();

    @Input()
    public uploadProgress: number = undefined;

    public processing: boolean = false;

    @Output()
    private saveEvent: EventEmitter<Company> = new EventEmitter();

    @Output()
    private updateEvent: EventEmitter<Company> = new EventEmitter();

    @Output()
    private imageSelectEvent: EventEmitter<File> = new EventEmitter();

    @Output()
    private imageDeleteEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    private imagePreviewEvent: EventEmitter<string> = new EventEmitter();

    @Output()
    private resetEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild(ImageManagerComponent)
    private imageManager:ImageManagerComponent = null;

    public profileFrom: FormGroup = null;

    constructor() {
    }

    ngOnInit(): void {
        this.initProfileForm();
    }

    public initProfileForm(): void {
        this.profileFrom = new FormGroup({
            'name': new FormControl(
                this.company?.name || '',
                [
                    Validators.required,
                    Validators.min(this.NAME_MIN_CHARS),
                    Validators.max(this.NAME_MAX_CHARS),
                ]
            ),
            'description': new FormControl(
                this.company?.description || '',
                [Validators.max(this.DESC_MAX_CHARS)]
            ),
        });
    }

    public get imageUrl(): string {
        return this.company?.imageUrl || '';
    }

    public reset(): void {
        this.initProfileForm();
        this.imageManager.imagePreview = null;
        this.imageManager.imageUrl = this.company.imageUrl;
        this.resetEvent.emit();
    }

    public save(): void {
        this.saveEvent.emit(new Company(this.profileFrom.value));
    }

    public update(): void {
        this.updateEvent.emit(new Company(this.profileFrom.value));
    }

    public selectLogo(image: File): void {
        this.imageSelectEvent.emit(image);
    }

    public deleteLogo(): void {
        this.imageDeleteEvent.emit();
    }

    public emitImagePreview(preview: string) {
        this.imagePreviewEvent.emit(preview);
    }

    public get name(): AbstractControl {
        return this.profileFrom.get('name');
    }

    public get description(): AbstractControl {
        return this.profileFrom.get('description');
    }

}
