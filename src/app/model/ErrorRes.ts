import {HttpErrorResponse} from "@angular/common/http";
import {Deserializable} from "./Deserializable";

export class ErrorRes implements Deserializable{

    private _status: number = 0;
    private _url: string = '';
    private _message: string = '';
    private _error: any = null;
    private _statusText: string = null;

    constructor(errorResp?: HttpErrorResponse) {
        if (errorResp !== null){
            this.deserialize(errorResp);
        }
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get error(): any {
        return this._error;
    }

    set error(value: any) {
        this._error = value;
    }

    get statusText(): string {
        return this._statusText;
    }

    set statusText(value: string) {
        this._statusText = value;
    }
}
