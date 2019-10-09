import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from './user';

@Injectable()
export class UsersService {
  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http.get('php/users_get.php').map((r: Response) => r.json())
    .catch((err, caught) => Observable.of([]));
  }

  getUser(id: string): Observable<User> {
    const params = new URLSearchParams();
    params.set('id', id);
    const options = new RequestOptions({ params: params });
    return this.http.get('php/users_get.php', options).map((r: Response) => r.json())
    .catch((err, caught) => Observable.of({}));
  }

  setUser(user: User): any {
    const data = JSON.stringify(user);
    return this.http.post('php/users_set.php', data).map((r: Response) => r.json());
  }

  deleteUser(id: number): any {
    const data = JSON.stringify({ id: id, mode: 'delete' });
    return this.http.post('php/users_set.php', data).map((r: Response) => r.json());
  }
}
