import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.model).subscribe(console.log);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  loggedOut(): void {
    localStorage.removeItem('token');
  }
}
