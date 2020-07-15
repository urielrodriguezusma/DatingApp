import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/models/pagination.interface';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  userParams: any = {};
  pagination: Pagination;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertyfyService) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'].result;
    this.pagination = this.route.snapshot.data['users'].pagination;

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((resp: PaginatedResult<User[]>) => {
        this.users = resp.result;
        this.pagination = resp.pagination;
      }, error => this.alertify.error(error));
  }
}
