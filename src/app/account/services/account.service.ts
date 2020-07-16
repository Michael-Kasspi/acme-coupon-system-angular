import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EndpointService} from "../../endpoint/endpoint.service";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {Account} from '../../model/Account';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    public getAccount(): Observable<Account> {
        return this.client.get<Account>(
            this.endpoint.url + 'accounts/',
            {withCredentials: true})
            .pipe(map(account => new Account(account)));
    }

    public updateAccount(account, password = ''): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.append('password', password);

        return this.client.put<any>(
            this.endpoint.url + 'accounts/',
            account,
            {
                headers: headers,
                withCredentials: true
            });
    }

    public isDuplicateEmail(email: string = ''): Observable<boolean> {
        let headers = new HttpHeaders();
        headers = headers.append('email', email);

        return this.client.get<boolean>(
            this.endpoint.url + 'accounts/emails',
            {
                headers: headers,
                withCredentials: true
            });
    }

    public isDuplicateEmailPublic(email: string = ''): Observable<boolean> {
        let headers = new HttpHeaders();
        headers = headers.append('email', email);

        return this.client.get<boolean>(
            this.endpoint.url + 'public/accounts/emails',
            {
                headers: headers,
                withCredentials: true
            });
    }

    public uploadProfileImage(image: File = null): Observable<any> {

        if (!image) {
            throw new Error('Unable to upload image without a file');
        }

        const formData = new FormData();
        formData.append('image', image);

        return this.client.post<File>(
            this.endpoint.url + 'accounts/profile/',
            formData,
            {withCredentials: true, reportProgress: true, observe: 'events'});
    }

    public deleteProfileImage(): Observable<any> {
        return this.client.delete<Account>(
            this.endpoint.url + 'accounts/profile/',
            {withCredentials: true}
        );
    }
}
