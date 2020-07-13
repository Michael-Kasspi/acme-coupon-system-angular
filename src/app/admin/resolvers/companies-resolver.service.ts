import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Company} from "../../model/Company";
import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AdminService} from '../services/admin.service';

@Injectable({
    providedIn: 'root'
})
export class CompaniesResolverService implements Resolve<Company[]> {

    constructor(private adminService: AdminService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]> {
        return this.adminService
            .getAllCompanies().pipe(
                map((companies: Company[]) => companies.map(company => new Company(company))),
                catchError(err => EMPTY));
    }
}
