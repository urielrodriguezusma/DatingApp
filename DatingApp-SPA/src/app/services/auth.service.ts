import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.Urlservice;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  private photoUrlSubject = new BehaviorSubject<string>('assets/user.png');
  currentPhotoUrl$ = this.photoUrlSubject.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string): void {
    this.photoUrlSubject.next(photoUrl);
  }

  login(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, model).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
          this.currentUser = response.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
          return response.token;
        }
      })
    );
  }

  register(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, model);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
