import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user.interface';
import { Observable, EMPTY } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertyfyService } from '../services/alertyfy.service';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<PaginatedResult<User[]>> {
  pageNumber = 1;
  pageSize = 5;
  likesParams = 'likers';

  constructor(
    private userList: UserService,
    private route: Router,
    private alertify: AlertyfyService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<User[]>> {

    return this.userList.getUsers(this.pageNumber, this.pageSize, null, this.likesParams).pipe(
      catchError(() => {
        this.alertify.error('Problem retriving users data!!!');
        this.route.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
