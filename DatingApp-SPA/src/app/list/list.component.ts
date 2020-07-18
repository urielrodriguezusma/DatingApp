import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../models/pagination.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AlertyfyService } from '../services/alertyfy.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private alertify: AlertyfyService) { }

  ngOnInit(): void {
    this.users = this.activeRoute.snapshot.data['users'].result;
    this.pagination = this.activeRoute.snapshot.data['users'].pagination;
    this.likesParam = 'likers';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((resp: PaginatedResult<User[]>) => {
        this.users = resp.result;
        this.pagination = resp.pagination;
      }, error => this.alertify.error(error));
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
