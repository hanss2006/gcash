import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {Transaction} from './transaction';
import {catchError} from 'rxjs/operators';
import {pipe, throwError} from 'rxjs';
import {User} from './user';
import {Settings} from './settings';
import {BaseService} from './base-service';

@Injectable()
export class TransactionsService extends BaseService{
  constructor(private http: HttpClient) {
    super();
  }

  getTransaction(accountGuid: string, guid: string): Observable<Transaction> {
    const options = {params: new HttpParams().set('account_guid', accountGuid).set('guid', guid)};
    return this.http.get<Transaction>('/gcash/www/transactions_get.php', options).pipe(catchError(this.handleError));
  }

  getTransactions(accountGuid: string, page: string = '1', search: string = ''): any {
    let params;
    if (search != '') {
      params = new HttpParams().set('account_guid', accountGuid).set('page', page)
        .set('count', Settings.pageCount.toString()).set('search', search);
    } else {
      params = new HttpParams().set('account_guid', accountGuid).set('page', page).set('count', Settings.pageCount.toString());
    }
    return this.http.get('/gcash/www/transactions_get.php', {params}).pipe(
      catchError(this.handleError)
    );
  }

  deleteTransactions(guid: string): any {
    const data = JSON.stringify({ guid, mode: 'delete' });
    return this.http.post('/gcash/www/transactions_set.php', data);
  }

  setTransaction(transaction: Transaction): any {
    const data = JSON.stringify(transaction);
    return this.http.post('/gcash/www/transactions_set.php', data);
  }
}
