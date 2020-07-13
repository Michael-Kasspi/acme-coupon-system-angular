import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EndpointService} from "../../endpoint/endpoint.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private client: HttpClient,
        private endpoint: EndpointService
    ) {
    }

    public getAccount(): Observable<any> {
        return this.client.get<any>(
            this.endpoint.url + 'accounts/',
            {withCredentials: true});
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

    public uploadProfileImage(image: File = null): Observable<any> {

        const formData = new FormData();
        formData.append('image', image);

        return this.client.post<File>(
            this.endpoint.url + 'accounts/profile/',
            formData,
            {withCredentials: true});
    }
}
