import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {BaseService} from './base-service';

@Injectable()
export class StaticPageService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getPage(fileName: string): Observable<string> {
    return this.http.get('assets/' + fileName, {responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }
}
