import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertyfyService } from '../services/alertyfy.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('userName', { static: true }) userName: ElementRef;
  @Output() cancelRegister = new EventEmitter<boolean>();
  frmRegister: FormGroup;
  user: User;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private alerty: AlertyfyService,
    private route: Router) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
    this.userName.nativeElement.focus();
  }

  createRegisterForm() {
    this.frmRegister = this.fb.group({
      gender: ['male'],
      userName: ['', Validators.required],
      knowAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      userPasswords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidators })
    });
  }

  register() {
    if (this.frmRegister.valid) {
      this.user = Object.assign({}, this.frmRegister.value);
      this.user.password = this.frmRegister.get('userPasswords.password').value;
      this.auth.register(this.user).subscribe(() => {
        this.alerty.success('Registration successfully');
      }, err => {
        this.alerty.error(err);
      }, () => {
        this.auth.login(this.user).subscribe(() => this.route.navigate(['/members']));
      });
    }
  }
  cancel() {
    this.frmRegister.reset();
    this.cancelRegister.emit(false);
  }

  passwordMatchValidators(c: AbstractControl): { [missmatch: string]: boolean } | null {
    if (c.get('password').value === c.get('confirmPassword').value) {
      return null;
    }
    return { missmatch: true };
  }

}
