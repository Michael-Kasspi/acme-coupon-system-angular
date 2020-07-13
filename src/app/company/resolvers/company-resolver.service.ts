import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {CompanyService} from '../services/company.service';
import {EMPTY, Observable} from 'rxjs';
import {Company} from '../../model/Company';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompanyResolverService implements Resolve<Company> {

    constructor(
        private companyService: CompanyService,
        private router: Router
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> {
        return this.companyService.getCompany().pipe(catchError(err => {
            this.router.navigate(['/login']);
            return EMPTY;
        }));
    }
}
