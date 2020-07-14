import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../../auth/session/session.service';
import {first, map} from 'rxjs/operators';
import {UserType} from '../../model/UserType';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.sessionService.userType$().pipe(first(), map(userType => {
            return userType === UserType.ADMIN ? true : this.router.createUrlTree(['/login']);
        }));
    }

}
