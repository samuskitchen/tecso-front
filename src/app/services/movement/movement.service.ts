import { Injectable } from '@angular/core';
import { environment as ENV} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movement } from 'src/app/model/movement';
import { ListMovement } from 'src/app/model/listMovement';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient) { }

  createMovement(movement: Object): Observable<Movement> {
    return this.http.post<Movement>(`${ENV.baseUrl}movements/save`, movement);
  }

  getMovementByAccountList(account: number, page: number, size: number): Observable<ListMovement> {
    if(page == null && size != null){
      return this.http.get<ListMovement>(`${ENV.baseUrl}movements/find/account/?id=${account}&size=${size}`);
    } else if(page == null){
      return this.http.get<ListMovement>(`${ENV.baseUrl}movements/find/account/?id=${account}`);
    } else{
      return this.http.get<ListMovement>(`${ENV.baseUrl}movements/find/account/?id=${account}&page=${page}&size=${size}`);
    }
  }
}
