import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertyfyService } from 'src/app/services/alertyfy.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertyfyService) { }

  ngOnInit(): void {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(() => {
      this.alertify.success('You have liked: ' + this.user.knowAs);
    }, error => this.alertify.error(error));
  }

}
