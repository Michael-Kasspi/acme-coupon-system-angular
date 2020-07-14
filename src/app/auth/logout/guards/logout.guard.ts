import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../../session/session.service';
import {first, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.sessionService.isLoggedIn$().pipe(first(), map(isLoggedIn => {
            return isLoggedIn ? true : this.router.createUrlTree(['/home']);
        }));
    }

}
