import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePlaceholderComponent } from './image-placeholder.component';



@NgModule({
    declarations: [ImagePlaceholderComponent],
    exports: [
        ImagePlaceholderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ImagePlaceholderModule { }
