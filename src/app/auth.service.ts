import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

class Role{
  public role:string;
}

@Injectable()
export class AuthService {
  private role: string = '';

  constructor(private http: HttpClient) { }

  login(credentials): Observable<string> {
    const data: string = JSON.stringify(credentials);
    const options = { params: new HttpParams().set('action', 'login') };
    return this.http.post<Role>('/gcash/www/auth.php', data, options).map((r: Role) => {
      // const d = r.json();
      this.role = r.role;
      return this.role;
    });
  }

  logout(): Observable<string> {
    const options = { params: new HttpParams().set('action', 'logout') };
    return this.http.get<Role>('/gcash/www/auth.php', options).map((r: Role) => {
      // const d = r.json();
      this.role = r.role;
      return this.role;
    });
  }

  getRole(): Observable<string> {
    if (this.role === '') {
      const options = { params: new HttpParams().set('action', 'check') };
      return this.http.get<Role>('/gcash/www/auth.php', options).map((r: Role) => {
        // const d = r.json();
        this.role = r.role;
        return this.role;
      });
    } else {
      return Observable.of(this.role);
    }
  }
}
