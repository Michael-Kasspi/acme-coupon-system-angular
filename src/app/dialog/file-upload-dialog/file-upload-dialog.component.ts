import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EndpointService} from '../../endpoint/endpoint.service';
import {WarningDialogComponent} from '../warning-dialog/warning-dialog.component';

@Component({
    selector: 'app-file-upload-dialog',
    templateUrl: './file-upload-dialog.component.html',
    styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent implements OnInit {

    readonly FIRST = 0;

    file: File = null;
    private _currentImageSrc: string = null;
    selectedImageSrc: string = null;
    action: string;
    private _previewImageSrc: any = null;

    deleteFileEvent = new EventEmitter<any>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<FileUploadDialogComponent>,
        public endpoint: EndpointService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this._currentImageSrc = this.data.currentImageUrl;
        this._previewImageSrc = this.data.imagePreview;
        this.action = this.data.action;
    }

    processFile(imageInput: HTMLInputElement) {
        const fileReader: FileReader = new FileReader();
        const file: File = imageInput.files[this.FIRST];

        if (file) {
            this.file = file;
            this.selectedImageSrc = null;
            this._currentImageSrc = null;
            this._previewImageSrc = null;
            fileReader.readAsDataURL(file);
        }

        fileReader.addEventListener('load', ev => {
            if (typeof fileReader.result === 'string') {
                this.selectedImageSrc = fileReader.result;
            }
        });
    }

    deleteImage() {
        this.openDeleteDialog().afterClosed().subscribe(isDelete => {
            if (isDelete) {
                this.dialogRef.close();
                this.deleteFileEvent.emit();
            }
        });
    }

    get currentImageSrc(): string {
        if (this._currentImageSrc) {
            return `${this.endpoint.res}${this._currentImageSrc}`;
        } else if (this._previewImageSrc) {
            return this._previewImageSrc;
        }
        return null;
    }

    private openDeleteDialog(): MatDialogRef<any> {
        return this.dialog.open(WarningDialogComponent, {
            data: {
                title: 'Confirm file deletion',
                body: 'Are you sure you want to delete this file?',
                action: 'Delete'
            }
        });
    }
}

