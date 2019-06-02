import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LogoutInfo } from '../auth/logout-info';
import { DeviceInfo } from './device-Info';

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const DURATION_KEY = 'expiryDuration';
const DEVICE_TYPE = 'deviceType';
const DEVICE_ID = 'deviceInfo';
const TOKEN_TYPE = 'tokenType';


@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  deviceInfo: DeviceInfo;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private logoutInfo: LogoutInfo;
  httpOptions = null;

  constructor(private authService: AuthService) { }

  signOut() {

    this.deviceInfo = new DeviceInfo(
      sessionStorage.getItem(DEVICE_ID),
      sessionStorage.getItem(DEVICE_TYPE));

    this.logoutInfo = new LogoutInfo(this.deviceInfo);

    this.authService.logout(this.logoutInfo).subscribe(
      data => {
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );

    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveTokenType(tokenType: string) {
    window.sessionStorage.removeItem(TOKEN_TYPE);
    window.sessionStorage.setItem(TOKEN_TYPE, tokenType);
  }

  public getTokenType(): string {
    return sessionStorage.getItem(TOKEN_TYPE);
  }

  public saveResfreshToken(refreshtoken: string) {
    window.sessionStorage.removeItem(REFRESH_KEY);
    window.sessionStorage.setItem(REFRESH_KEY, refreshtoken);
  }

  public getResfreshToken(): string {
    return sessionStorage.getItem(REFRESH_KEY);
  }

  public saveDuration(durarion: string) {
    window.sessionStorage.removeItem(DURATION_KEY);
    window.sessionStorage.setItem(DURATION_KEY, durarion);
  }

  public getDuration(): string {
    return sessionStorage.getItem(DURATION_KEY);
  }

  public saveDeviceInfo(deviceInfo: DeviceInfo) {
    window.sessionStorage.removeItem(DEVICE_TYPE);
    window.sessionStorage.removeItem(DEVICE_ID);

    window.sessionStorage.setItem(DEVICE_TYPE, deviceInfo.deviceType);
    window.sessionStorage.setItem(DEVICE_ID, deviceInfo.deviceId);
  }

  reloadPage() {
    window.location.reload();
  }
}
