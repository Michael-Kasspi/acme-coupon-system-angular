import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/Category';

export const ADD_MODE = 'add';
export const EDIT_MODE = 'edit';

export const NAME_CHAR_MIN = 3;
export const NAME_CHAR_MAX = 20;
export const DESC_CHAR_MAX = 250;

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    animations: [trigger('controlsSwitch', [
        transition(':enter', [
            style({
                width: '100%',
                position: 'absolute',
                left: '105%',
                opacity: 0
            }),
            animate('0.5s ease-in', style({left: 0})),
            animate('0.5s ease-out', style({opacity: 1})),
        ]),
        transition(':leave', [
            style({
                width: '100%',
                position: 'absolute',
                left: 0,
                opacity: 1
            }),
            animate('0.5s ease-in', style({left: '105%'})),
            animate('0.5s ease-out', style({opacity: 0})),
        ])
    ])]
})
export class CategoryFormComponent implements OnInit, OnChanges {

    readonly ADD_MODE: string = ADD_MODE;
    readonly EDIT_MODE: string = EDIT_MODE;

    readonly NAME_CHAR_MIN: number = NAME_CHAR_MIN;
    readonly NAME_CHAR_MAX: number = NAME_CHAR_MAX;
    readonly DESC_CHAR_MAX: number = DESC_CHAR_MAX;

    @Input()
    mode: string = null;

    @Input()
    category: Category = null;

    form: FormGroup = null;

    constructor() {
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const category = changes['category'];
        if (category.previousValue !== category.currentValue) {
            this.initForm();
        }
    }

    initForm(): void {
        this.form = new FormGroup({
            name: new FormControl(
                this?.category?.name || '',
                [
                    Validators.required,
                    Validators.min(NAME_CHAR_MIN),
                    Validators.max(NAME_CHAR_MAX)
                ]),
            description: new FormControl(this?.category?.description || '', [
                Validators.max(DESC_CHAR_MAX)
            ])
        });
    }

    get name(): AbstractControl {
        return this.form.get('name');
    }

    get description(): AbstractControl {
        return this.form.get('description');
    }
}
