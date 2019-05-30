import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: TokenStorageService, private router: Router) {
  }

  canActivate() {
     if (this.authService.getToken() ==  null) {
      this.router.navigate(['auth/login']);
    }else{
      return true;
    } 
  }
}