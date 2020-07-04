import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertyfyService } from '../services/alertyfy.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public auth: AuthService,
    private alerty: AlertyfyService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.model).subscribe(() => {
      this.alerty.success('Logged in successfully');
    }, error => {
      this.alerty.error(error);
    });
  }

  loggedIn(): boolean {
     return this.auth.loggedIn();
  }
  loggedOut(): void {
    localStorage.removeItem('token');
    this.alerty.message('Logged out');
  }
}
