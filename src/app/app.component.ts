import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TokenStorageService } from './components/auth/token-storage.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    console.log("ngOnInit");
    this.info = {
      token: this.token.getToken(),
      refreshToken: this.token.getResfreshToken(),
      duration: this.token.getDuration()
    };

    console.log(this.info);

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

  tabs: any[] = [
    {
      title: 'Home',
      icon: 'nb-home',
      route: 'home',
    },
    {
      title: 'Accounts',
      icon: 'nb-list',
      responsive: true,
      route: [ '/accounts' ],
    },
    {
      title: 'Add Account',
      icon: 'nb-compose',
      responsive: true,
      route: [ '/add' ],
    },
  ];
}
