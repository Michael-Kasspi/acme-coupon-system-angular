import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EndpointService} from '../../../endpoint/endpoint.service';
import {FileUploadDialogComponent} from '../../../dialog/file-upload-dialog/file-upload-dialog.component';
import {AccountService} from '../../services/account.service';
import {Account} from '../../../model/Account';
import {AccountDetailsService} from '../../services/account-details.service';
import {filter, first, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

    @Input()
    public  account: Account = null;
    public uploadProgress: number = undefined;

    constructor(
        private matDialog: MatDialog,
        private accountService: AccountService,
        private snackBar: MatSnackBar,
        private endpoint: EndpointService,
        private avatarService: AccountDetailsService
    ) {
    }

    ngOnInit(): void {
    }

    selectImage() {
        const matDialogRef = this.getMatDialogRef();
        const component = matDialogRef.componentInstance;
        const previewImage$ = this.getPreviewImage$(component);
        const deleteImage$ = this.getDeleteImage$(component);

        matDialogRef.afterClosed().subscribe(file => {
            previewImage$?.unsubscribe();
            deleteImage$?.unsubscribe();
            if (file) {
                this.upload(file);
            }
        });
    }

    private getDeleteImage$(component) {
        return component.deleteFileEvent.pipe(first())
            .subscribe(_ => {
                const url = this.account.profilePictureUrl;
                this.account.profilePictureUrl = null;
                this.accountService.deleteProfileImage().subscribe(account => {
                    this.account.deserialize(account);
                    this.avatarService.account = this.account;
                    this.snackBar.open('The profile image has been deleted successfully');
                }, error => this.account.profilePictureUrl = url);
            });
    }

    private getPreviewImage$(component) {
        return component.selectedImagePreviewEvent.pipe(first())
            .subscribe(preview => {
                this.account.profilePicturePreview = preview;
            });
    }

    private getMatDialogRef() {
        return this.matDialog.open(FileUploadDialogComponent, {
            data: {
                currentImageUrl: this.account.profilePictureUrl,
                action: 'Upload'
            }
        });
    }

    private upload(file: File) {
        this.uploadImageWithProgress(file)
            .subscribe(account => {
                this.account.deserialize(account);
                this.avatarService.account = this.account;
                this.snackBar.open('Profile image was uploaded successfully');
            });
    }

    private uploadImageWithProgress(file: File) {
        return this.accountService
            .uploadProfileImage(file)
            .pipe(
                tap((event: HttpEvent<Account>) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.uploadProgress = Math.round(100 * event.loaded / event.total);
                    }
                }),
                filter((event: HttpEvent<Account>) => event.type === HttpEventType.Response),
                tap(_ => this.uploadProgress = undefined),
                map((event: HttpEvent<Account>) => new Account((event as HttpResponse<Account>).body)),
            );
    }

    get profilePicture(): string {
        const preview = this?.account?.profilePicturePreview;
        if (preview) {
            return preview;
        }
        return (this.endpoint.res + this.account.profilePictureUrl);
    }
}
