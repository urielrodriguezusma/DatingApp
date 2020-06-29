import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  $values = this.httpClient.get(`${environment.Urlservice}/values`);

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
