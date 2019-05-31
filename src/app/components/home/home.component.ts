import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;

  constructor(private router: Router, private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      refreshToken: this.token.getResfreshToken(),
      duration: this.token.getDuration()
    };
  }

  logout() {
    this.token.signOut();

    this.info = {
      token: this.token.getToken(),
      refreshToken: this.token.getResfreshToken(),
      duration: this.token.getDuration()
    };

    this.router.navigate(['auth/login']);
  }
}
