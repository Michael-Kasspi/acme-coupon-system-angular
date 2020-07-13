import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ManualProgressBarService} from './manual-progress-bar.service';
import {NavigatingProgressBarService} from "./navigating-progress-bar.service";

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {

    constructor(
        private navigating: NavigatingProgressBarService,
        private manual: ManualProgressBarService
    ) {}

    onLoading(): Observable<boolean> {

        const subject = new Subject<boolean>();

        this.navigating.onNavigating().subscribe(subject);
        this.manual.onStatusChange().subscribe(subject);

        return subject;
    }
}
