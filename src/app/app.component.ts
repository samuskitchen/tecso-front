import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TokenStorageService } from './components/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'Account [Tecso Team]';
  info: any;

  public isMobilevar = false;
  public isTabletvar = false;
  public isDesktopvar = false;
 
  constructor( private deviceService: DeviceDetectorService, private token: TokenStorageService) {
    this.detectDevice();
    this.isMobile();
    this.isTablet();
    this.isDesktop();
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      refreshToken: this.token.getResfreshToken(),
      duration: this.token.getDuration()
    };
  }
 
  public detectDevice() {
    return this.deviceService.getDeviceInfo();
  }
 
  public isMobile() {
    this.isMobilevar = this.deviceService.isMobile();
  }
 
  public isTablet() {
    this.isTabletvar = this.deviceService.isTablet();
  }
 
  public isDesktop() {
    this.isDesktopvar = this.deviceService.isDesktop();
  }
}
