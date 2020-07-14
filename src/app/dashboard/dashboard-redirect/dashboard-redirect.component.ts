import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../auth/session/session.service';
import {first} from 'rxjs/operators';
import {UserType} from '../../model/UserType';

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
            if (userType === UserType.GUEST) {
                this.router.navigate(['/login']);
                return;
            }
            this.router.navigate([`./${userType}`], {relativeTo: this.route});
        });
    }

}
