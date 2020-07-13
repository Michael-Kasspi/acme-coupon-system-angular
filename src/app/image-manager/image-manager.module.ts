import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageManagerComponent } from './image-manager.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
    declarations: [ImageManagerComponent],
    exports: [
        ImageManagerComponent
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class ImageManagerModule { }
