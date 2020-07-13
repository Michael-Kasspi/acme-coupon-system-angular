import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {share} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NavigatingProgressBarService {

    constructor(private router: Router) {}

    onNavigating(): Observable<boolean> {

        return new Observable<boolean>(subscriber => {

            this.router.events.subscribe((event: Event) => {

                switch (true) {
                    case event instanceof NavigationStart: {
                        subscriber.next(true);
                        break;
                    }

                    case event instanceof NavigationEnd:
                    case event instanceof NavigationCancel:
                    case event instanceof NavigationError: {
                        subscriber.next(false);
                        break;
                    }
                }
            });
        }).pipe(share());
    }
}
