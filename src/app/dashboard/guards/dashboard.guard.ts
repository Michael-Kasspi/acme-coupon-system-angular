import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../../auth/session/session.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

    constructor(
        private sessionService: SessionService,
        private router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.sessionService.isLoggedIn$().pipe(map(loggedIn => {
            if (loggedIn) {
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }));
    }

}
