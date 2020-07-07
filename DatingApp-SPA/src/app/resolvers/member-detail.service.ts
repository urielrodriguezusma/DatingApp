import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { Observable, EMPTY, of } from 'rxjs';
import { AlertyfyService } from '../services/alertyfy.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private route: Router,
    private alertify: AlertyfyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(+route.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problem retriving data');
        this.route.navigate(['/members']);
        return EMPTY;
      })
    );
  }
}
