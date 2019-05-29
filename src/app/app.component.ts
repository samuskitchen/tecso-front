import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceInfo } from './auth/device-Info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Account [Tecso Team]';

  public isMobilevar = false;
  public isTabletvar = false;
  public isDesktopvar = false;
 
  constructor( private deviceService: DeviceDetectorService) {
    this.detectDevice();
    this.isMobile();
    this.isTablet();
    this.isDesktop();
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
