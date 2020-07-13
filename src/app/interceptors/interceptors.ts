import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorMessageInterceptor} from "./error-message-interceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorMessageInterceptor, multi: true },
];
