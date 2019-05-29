import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './auth/token-storage.service';
import { Account } from './account';
import { ListAccount } from './listAccount';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private baseUrl = 'http://localhost:8083/api/account';

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getTokenType() + this.tokenStorage.getToken()
     })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/find/id?id=${id}`);
  }

  createAccount(account: Object): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/save`, account);
  }

  updateAccount(accountUpdate: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, accountUpdate);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete?id=${id}`, { responseType: 'text' });
  }

  getAccountTypeList(accountType: string, page: number, size: number): Observable<ListAccount> {
    return this.http.get<ListAccount>(`${this.baseUrl}/find/type/?accountType=${accountType}&page=${page}&size=${size}`, this.httpOptions);
  }

}
