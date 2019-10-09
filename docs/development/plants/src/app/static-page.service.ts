import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class StaticPageService {
  constructor(private http: Http) { }

  getPage(fileName: string): Observable<string> {
    return this.http.get('assets/' + fileName).map((r: Response) => r.text())
    .catch((err, caught) => Observable.of(''));
  }
}
