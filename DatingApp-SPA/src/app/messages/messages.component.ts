import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.interface';
import { Pagination, PaginatedResult } from '../models/pagination.interface';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertyfyService } from '../services/alertyfy.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertyfyService) { }

  ngOnInit(): void {
    this.messages = this.route.snapshot.data['messages'].result;
    this.pagination = this.route.snapshot.data['messages'].pagination;
  }

  loadMessages() {
    this.userService.getMessages(
      this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer).subscribe((resp: PaginatedResult<Message[]>) => {
        this.messages = resp.result;
        this.pagination = resp.pagination;
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has deleted');
      }, error => this.alertify.error('Failed to delete the message'));
    });
  }

}
