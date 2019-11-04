import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from './user';
import {catchError} from 'rxjs/operators';
import {BaseService} from './base-service';

@Injectable()
export class UsersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/gcash/www/users_get.php', {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );
/*
    return this.http.get('/gcash/www/users_get.php').map((r: Response) => r.json())
      .catch((err, caught) => Observable.of([]));
 */
  }

/*
  getUser(id: string): Observable<User> {
    const params = new URLSearchParams();
    params.set('id', id);
    const options = new RequestOptions({ params: params });
    return this.http.get('/gcash/www/users_get.php', options).map((r: Response) => r.json())
      .catch((err, caught) => Observable.of({}));
  }
 */
  getUser(id: string): Observable<User> {
    const options = { params: new HttpParams().set('id', id) };
    return this.http.get<User>('/gcash/www/users_get.php', options).pipe(
      catchError(this.handleError)
    );
  }

  setUser(user: User): any {
    const data = JSON.stringify(user);
    return this.http.post('/gcash/www/users_set.php', data);
  }

  deleteUser(id: number): any {
    const data = JSON.stringify({ id, mode: 'delete' });
    return this.http.post('/gcash/www/users_set.php', data);
  }
}
