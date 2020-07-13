import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EndpointService} from '../../../endpoint/endpoint.service';
import {FileUploadDialogComponent} from '../../../dialog/file-upload-dialog/file-upload-dialog.component';
import {AccountService} from '../../services/account.service';
import {Account} from '../../../model/Account';

@Component({
    selector: 'app-account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

    @Input()
    account: Account = null;

    constructor(
        private matDialog: MatDialog,
        private accountService: AccountService,
        private snackBar: MatSnackBar,
        private endpoint: EndpointService
    ) {
    }

    ngOnInit(): void {
    }

    selectImage() {
        this.matDialog.open(FileUploadDialogComponent)
            .afterClosed()
            .subscribe(file => {
                if (file) {
                    this.accountService
                        .uploadProfileImage(file)
                        .subscribe(account => {
                            this.account.deserialize(account);
                            this.snackBar.open('Profile image was uploaded successfully')
                        })
                }
            })
    }

    get profilePicture(): string{
        return (this.endpoint.res + this.account.profilePictureUrl);
    }
}
