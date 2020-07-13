import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {EndpointService} from '../../../endpoint/endpoint.service';
import {SessionService} from '../../session/session.service';
import {Credentials} from '../../../model/Credentials';
import {Account} from '../../../model/Account';
import {User} from '../../../model/User';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private client: HttpClient,
        private session: SessionService,
        private router: Router,
        private endpointService: EndpointService,
    ) {
    }

    login(credentials: Credentials): Observable<User> {

        let headers = new HttpHeaders();

        headers = headers
            .append('email', credentials.email)
            .append('password', credentials.password);

        return this.client.post<any>(
            this.endpointService.url + 'login',
            null,
            {
                headers: headers,
                withCredentials: true
            }
        ).pipe(
            map(response => new Account(response.account).user),
            tap(
                user => this.session.initSession(user),
                error => this.session.clearSession()
            )
        );
    }

}
