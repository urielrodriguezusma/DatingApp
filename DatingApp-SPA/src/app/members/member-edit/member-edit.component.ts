import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  user: User;
  photoUrl: string;

  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(
    private route: ActivatedRoute,
    private alertify: AlertyfyService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.authService.currentPhotoUrl$.subscribe((photoUrl: string) => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Update Successfully');
      this.editForm.reset(this.user);
    },
      error =>
        this.alertify.error(error));
  }

  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }

}
