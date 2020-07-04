import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertyfyService } from '../services/alertyfy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alerty: AlertyfyService,
    private route: Router) { }
  canActivate(): boolean {

    if (this.auth.loggedIn) {
      return true;
    }

    this.route.navigate(['/home']);
    this.alerty.error('you shall no pass!!!');
    return false;

  }
}
