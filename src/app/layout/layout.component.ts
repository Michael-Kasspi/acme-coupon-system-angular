import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Event, NavigationEnd, Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('top')
    private top: ElementRef<any> = null;

    routerEvents$: Subscription = null;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.routerEvents$ = this.scrollToTopOnNav().subscribe();
    }

    ngOnDestroy(): void {
        this.routerEvents$.unsubscribe();
    }

    private scrollToTopOnNav(): Observable<any> {
        return this.router.events.pipe(tap((event: Event) => {
            if (true === event instanceof NavigationEnd) {
                if (this.top) {
                    this.top.nativeElement.scrollIntoView();
                }
            }
        }));
    }

}
