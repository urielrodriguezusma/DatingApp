import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Message } from '../models/message.interface';
import { Observable, EMPTY } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertyfyService } from '../services/alertyfy.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { PaginatedResult } from '../models/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: Router,
    private alertify: AlertyfyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<Message[]>> {
    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error('Problem retriving messages!!!');
        this.route.navigate(['/members']);
        return EMPTY;
      })
    );
  }
}
