import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListAccount } from '../../model/listAccount';
import { Account } from 'src/app/model/account';
import { TokenStorageService } from '../../components/auth/token-storage.service';
import { environment as ENV} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getTokenType() + this.tokenStorage.getToken()
     })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${ENV.baseUrl}account/find/id?id=${id}`);
  }

  createAccount(account: Object): Observable<Account> {
    return this.http.post<Account>(`${ENV.baseUrl}account/save`, account);
  }

  updateAccount(accountUpdate: Object): Observable<Object> {
    return this.http.put(`${ENV.baseUrl}account/update`, accountUpdate);
  }

  deleteAccount(id: number): Observable<string> {
    return this.http.delete<string>(`${ENV.baseUrl}account/delete?id=${id}`);
  }

  getAccountTypeList(accountType: string, page: number, size: number): Observable<ListAccount> {
    return this.http.get<ListAccount>(`${ENV.baseUrl}account/find/type/?accountType=${accountType}&page=${page}&size=${size}`);
  }

}
