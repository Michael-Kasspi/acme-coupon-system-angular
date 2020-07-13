import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ManualProgressBarService {

    private readonly _status$: Subject<boolean> = null;

    constructor() {
        this._status$ = new Subject();
    }

    set status(value: boolean) {
        this._status$.next(value);
    }

    public onStatusChange(): Observable<boolean> {
        return this._status$.asObservable();
    }
}
