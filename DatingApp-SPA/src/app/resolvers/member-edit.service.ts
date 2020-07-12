import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { Observable, EMPTY, of } from 'rxjs';
import { AlertyfyService } from '../services/alertyfy.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private route: Router,
    private alertify: AlertyfyService,
    private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problem retriving your data!!!');
        this.route.navigate(['/members']);
        return EMPTY;
      })
    );
  }
}
