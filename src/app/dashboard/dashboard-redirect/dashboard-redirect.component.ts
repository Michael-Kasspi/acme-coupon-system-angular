import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../auth/session/session.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-redirect',
    templateUrl: './dashboard-redirect.component.html',
    styleUrls: ['./dashboard-redirect.component.scss']
})
export class DashboardRedirectComponent implements OnInit {

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public sessionService: SessionService
    ) {
    }

    ngOnInit(): void {
        this.sessionService.userType$().pipe(first()).subscribe(userType => {
            this.router.navigate([`./${userType}`], {relativeTo: this.route});
        });
    }

}
