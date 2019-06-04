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

  constructor(private http: HttpClient) { }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${ENV.baseUrl}account/find/id?id=${id}`);
  }

  createAccount(account: Object): Observable<Account> {
    return this.http.post<Account>(`${ENV.baseUrl}account/save`, account);
  }

  updateAccount(accountUpdate: Account): Observable<string> {
    return this.http.put<string>(`${ENV.baseUrl}account/update`, accountUpdate);
  }

  deleteAccount(id: number): Observable<string> {
    return this.http.delete<string>(`${ENV.baseUrl}account/delete?id=${id}`);
  }

  getAccountTypeList(accountType: string, page: number, size: number): Observable<ListAccount> {
    if(page == null && size != null){
      return this.http.get<ListAccount>(`${ENV.baseUrl}account/find/type/?accountType=${accountType}&size=${size}`);
    } else if(page == null){
      return this.http.get<ListAccount>(`${ENV.baseUrl}account/find/type/?accountType=${accountType}`);
    } else{
      return this.http.get<ListAccount>(`${ENV.baseUrl}account/find/type/?accountType=${accountType}&page=${page}&size=${size}`);
    }
  }

}
