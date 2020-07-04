import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.Urlservice;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, model).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
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
    return !this.jwtHelper.isTokenExpired(token);
  }
}
