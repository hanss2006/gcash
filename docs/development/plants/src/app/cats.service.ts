import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Cat } from './cat';

@Injectable()
export class CatsService {
  constructor(private http: Http) { }

  getCats(): Observable<Cat[]> {
    return this.http.get('php/cats_get.php').map((r: Response) => r.json())
    .catch((err, caught) => Observable.of([]));
  }

  getCat(id: string): Observable<Cat> {
    const params = new URLSearchParams();
    params.set('id', id);
    const options = new RequestOptions({ params: params });
    return this.http.get('php/cats_get.php', options).map((r: Response) => r.json())
    .catch((err, caught) => Observable.of({}));
  }
}
