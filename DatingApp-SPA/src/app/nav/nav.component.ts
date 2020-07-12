import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertyfyService } from '../services/alertyfy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    public auth: AuthService,
    private alerty: AlertyfyService,
    private route: Router) { }

  ngOnInit(): void {
    this.auth.currentPhotoUrl$.subscribe((photoUrl: string) =>
      this.photoUrl = photoUrl
    );
  }

  login() {
    this.auth.login(this.model).subscribe(() => {
      this.alerty.success('Logged in successfully');
    }, error => {
      this.alerty.error(error);
    }, () => {
      this.route.navigate(['/members']);
    });
  }

  loggedIn(): boolean {
    return this.auth.loggedIn();
  }
  loggedOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.auth.decodedToken = null;
    this.auth.currentUser = null;
    this.alerty.message('Logged out');
    this.route.navigate(['/home']);
  }
}
