import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  private role: string = '';

  constructor(private http: Http) { }

  login(credentials): Observable<string> {
    const data: string = JSON.stringify(credentials);
    const params: URLSearchParams = new URLSearchParams();
    params.set('action', 'login');
    const options: RequestOptions = new RequestOptions({ params: params });
    return this.http.post('php/auth.php', data, options).map((r: Response) => {
      const d = r.json();
      this.role = d.role;
      return this.role;
    });
  }

  logout(): Observable<string> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('action', 'logout');
    const options: RequestOptions = new RequestOptions({ params: params });
    return this.http.get('php/auth.php', options).map((r: Response) => {
      const d = r.json();
      this.role = d.role;
      return this.role;
    });
  }

  getRole(): Observable<string> {
    if (this.role === '') {
      const params: URLSearchParams = new URLSearchParams();
      params.set('action', 'check');
      const options: RequestOptions = new RequestOptions({ params: params });
      return this.http.get('php/auth.php', options).map((r: Response) => {
        const d = r.json();
        this.role = d.role;
        return this.role;
      });
    } else {
      return Observable.of(this.role);
    }
  }
}
