import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {BaseService} from './base-service';
import {catchError} from 'rxjs/operators';
import {AccountTree} from './account-tree';

@Injectable()
export class AccountTreeService extends BaseService {

  constructor(protected http: HttpClient) { super(); }

  getAccountTree(): Observable<AccountTree> {
    return this.http.get<AccountTree>('/gcash/www/account_tree.php', {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );
  }


}
