import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {FileUploadDialogComponent} from '../dialog/file-upload-dialog/file-upload-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {EndpointService} from '../endpoint/endpoint.service';

@Component({
    selector: 'app-image-manager',
    templateUrl: './image-manager.component.html',
    styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent implements OnInit {

    public readonly SELECT_MODE: string = 'select';
    public readonly UPLOAD_MODE: string = 'upload';
    public readonly DEFAULT_MODE: string = this.UPLOAD_MODE;

    @Input()
    public mode: string = this.DEFAULT_MODE;

    @Input()
    public progress: number = undefined;

    @Input()
    public imagePreview: string = null;

    @Input('imageUrl')
    private _imageUrl: string = null;

    @Output()
    private imageSelectedEvent = new EventEmitter<File>();

    @Output()
    private imagePreviewEvent = new EventEmitter<string>();

    @Output()
    private imageDeleteEvent = new EventEmitter<any>();

    @Output()
    private imageBrowseEvent = new EventEmitter<any>();

    constructor(
        public dialog: MatDialog,
        public endpoint: EndpointService
    ) {
    }

    ngOnInit(): void {
    }

    public openImageSelectDialog() {
        this.imageBrowseEvent.emit();
        const dialogRef = this.configDialog();
        const component = dialogRef.componentInstance;
        const deleteImage$ = this.deleteImageListener(component.deleteFileEvent);
        const previewImage$ = this.previewImageListener(component.selectedImagePreviewEvent);
        dialogRef.afterClosed()
            .subscribe(file => {
                deleteImage$.unsubscribe();
                previewImage$.unsubscribe();
                if (file) {
                    this.imageUrl = null;
                    this.imageSelectedEvent.emit(file);
                }
            });
    }

    private deleteImageListener(event: Observable<any>): Subscription {
        return event.pipe(first())
            .subscribe(event => {
                this.imagePreview = null;
                this.imageDeleteEvent.emit();
            });
    }

    private configDialog() {
        return this.dialog.open(
            FileUploadDialogComponent,
            {
                data: {
                    currentImageUrl: this._imageUrl,
                    imagePreview: this.imagePreview,
                    action: this.mode === this.SELECT_MODE ? 'Select' : null
                }
            }
        );
    }

    get imageUrl() {
        if (this._imageUrl) {
            return this.generateImageUrl();
        }

        return this.imagePreview || '';
    }

    private generateImageUrl() {
        return this._imageUrl ? `${this.endpoint.res}${this._imageUrl}` : null;
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    private previewImageListener(previewEvent: Observable<string>) {
        return previewEvent.subscribe(this.imagePreviewEvent.emit);
    }
}
