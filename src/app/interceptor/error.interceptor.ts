import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";


export const errorInterceptor : HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                router.navigate(['/login']);
            }
            const error = err.error.message || err.statusText;
            return throwError(() => error);
        })
    );
}