import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  private readonly authService = this.inject.get(AuthService);

  constructor(private inject: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if (this.authService.loggedIn()) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          } else if (error.status === 0) {
            return throwError('No existe conexión con el servicio');
          }

          const serverError = error.error;
          let modalStatesErrors = '';
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStatesErrors += serverError.errors[key] + '\n';
              }
            }
          }
          return throwError(modalStatesErrors || serverError || 'Server Error');
        }
      })
    );
  }
}
