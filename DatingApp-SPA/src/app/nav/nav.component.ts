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

  constructor(
    public auth: AuthService,
    private alerty: AlertyfyService,
    private route: Router) { }

  ngOnInit(): void {
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
    this.alerty.message('Logged out');
    this.route.navigate(['/home']);
  }
}
