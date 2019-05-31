import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { LogoutInfo } from './logout-info';
import { environment as ENV} from 'src/environments/environment';

  const loginUrl = 'auth/login';
  const signupUrl = 'auth/register';
  const logoutUrl = 'user/logout';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${ENV.baseUrl}${loginUrl}`, credentials);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(`${ENV.baseUrl}${signupUrl}`, info);
  }

  logout(logout: LogoutInfo): Observable<string> {
    return this.http.post<string>(`${ENV.baseUrl}${logoutUrl}`, logout);
  }
}
