import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  $values = this.http.get(`${environment.Urlservice}/values`);
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  registerToogle() {
    this.registerMode = !this.registerMode;
  }

}
