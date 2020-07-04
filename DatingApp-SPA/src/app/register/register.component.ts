import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  frmRegister: FormGroup;
  model: any = {};
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.frmRegister = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {

    if (this.frmRegister.valid) {
      this.model.userName = this.frmRegister.get('userName').value;
      this.model.password = this.frmRegister.get('password').value;
      this.auth.register(this.model).subscribe(resp => {
        console.log(resp);
      });
    }
  }
  cancel() {
    this.frmRegister.reset();
    this.cancelRegister.emit(false);
  }

}
