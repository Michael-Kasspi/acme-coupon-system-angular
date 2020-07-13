import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";
import {ErrorHandlerService} from '../error-handler/error-handler.service';

@Injectable()
export class ErrorMessageInterceptor implements HttpInterceptor {


    constructor(private errorHandler: ErrorHandlerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(err => this.errorHandler.handleError(err)));
    }
}
