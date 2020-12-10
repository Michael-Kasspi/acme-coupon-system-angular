import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

export const ADD_MODE = 'add';
export const EDIT_MODE = 'edit';

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
export class CategoryFormComponent implements OnInit {

    @Input()
    mode: string = null;

    readonly ADD_MODE: string = ADD_MODE;
    readonly EDIT_MODE: string = EDIT_MODE;

    constructor() {
    }

    ngOnInit(): void {
    }

}
