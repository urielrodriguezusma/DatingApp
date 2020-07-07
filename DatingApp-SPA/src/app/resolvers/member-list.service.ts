import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user.interface';
import { Observable, EMPTY } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertyfyService } from '../services/alertyfy.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberListResolver implements Resolve<User[]> {

  constructor(
    private userList: UserService,
    private route: Router,
    private alertify: AlertyfyService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {

    return this.userList.getUsers().pipe(
      catchError(() => {
        this.alertify.error('Problem retriving users data!!!');
        this.route.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
