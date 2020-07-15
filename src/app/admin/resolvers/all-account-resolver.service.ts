import {Injectable} from '@angular/core';
import {Account} from '../../model/Account';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {AdminService} from '../services/admin.service';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AllAccountResolverService implements Resolve<Account[]>{

    constructor(private adminService: AdminService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account[]> {
        return this.adminService.getAllAccounts().pipe(catchError(err => EMPTY));
    }
}
