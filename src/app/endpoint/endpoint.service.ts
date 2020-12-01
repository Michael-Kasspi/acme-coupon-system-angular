import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EndpointService {

    private _url: string = environment.endpoint;

    constructor() {
    }

    get url(): string {
        return this._url + 'api/';
    }

    get res(): string {
        return this._url + 'storage/';
    }

    init() {
        if (environment.production) {
            this._url = '';
        }
    }
}
