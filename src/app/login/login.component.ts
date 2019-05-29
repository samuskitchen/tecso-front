import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { DeviceInfo } from '../auth/device-Info';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  deviceInfo: DeviceInfo;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
      private appComponent: AppComponent) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    if(this.appComponent.isMobile 
      && this.appComponent.detectDevice().os == "android"){
        this.deviceInfo = new DeviceInfo("7b3a462e50f78383", "DEVICE_TYPE_ANDROID");
    } 
    else if(this.appComponent.isMobile 
      && this.appComponent.detectDevice().os == "ios"){
        this.deviceInfo = new DeviceInfo("7b3a462e50f78385", "DEVICE_TYPE_IOS");
    } 
    else if(this.appComponent.isDesktop ){
      this.deviceInfo = new DeviceInfo("7b3a462e50f78389", "DEVICE_TYPE_WEB");
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password,
      this.form.email,
      this.deviceInfo);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveResfreshToken(data.refreshToken);
        this.tokenStorage.saveDuration(data.expiryDuration.toString());
        this.tokenStorage.saveTokenType(data.tokenType);
        this.tokenStorage.saveDeviceInfo(this.deviceInfo);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
