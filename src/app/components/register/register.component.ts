import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = "";
  successMessage = "";

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  register() {
    this.signupInfo = new SignUpInfo(
      this.form.username,
      this.form.password,
      this.form.email,
      this.form.registerAsAdmin = false);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        if(data['success'] && data['success'] == true){
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.successMessage = data['data'];
        }

        if(data['status'] && data['status'] != 200){
          this.isSignedUp = false;
          this.isSignUpFailed = true;
          this.errorMessage = data['message'];
        }
      },
      error => {
        this.errorMessage = error.error;
        this.isSignedUp = false;
        this.isSignUpFailed = true;
      }
    );
  }
}
