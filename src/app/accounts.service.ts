import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {Account} from './account';
import {catchError} from 'rxjs/operators';
import {BaseService} from './base-service';

@Injectable()
export class AccountsService extends BaseService {

  constructor(protected http: HttpClient) {
    super();
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('/gcash/www/accounts_get.php', {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );
  }

  getAccount(guid: string): Observable<Account> {
    const options = { params: new HttpParams().set('guid', guid) };
    return this.http.get<Account>('/gcash/www/accounts_get.php', options).pipe(
      catchError(this.handleError)
    );
  }

}
