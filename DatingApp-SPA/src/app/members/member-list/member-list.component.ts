import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { threadId } from 'worker_threads';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertyfyService) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
  }
}
