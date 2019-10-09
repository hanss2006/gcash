import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Settings } from './settings';
import { Comment } from './comment';

@Injectable()
export class CommentsService {
  constructor(private http: Http) { }

  getComments(plant: string = '', page: string = '1', search: string = ''): Observable<any> {
    const params = new URLSearchParams();
    if (plant != '') {
      params.set('plant', plant);
    } else {
      params.set('page', page);
      params.set('count', Settings.pageCount.toString());
      if (search != '') {
        params.set('search', search);
      }
    }
    const options = new RequestOptions({ params: params });
    return this.http.get('php/comments_get.php', options).map((r: Response) => r.json())
    .catch((err, caught) => Observable.of([]));
  }

  getComment(id: string): Observable<Comment> {
    const params = new URLSearchParams();
    params.set('id', id);
    const options = new RequestOptions({ params: params });
    return this.http.get('php/comments_get.php', options).map((r: Response) => r.json())
    .catch((err, caught) => Observable.of({}));
  }

  setComment(comment: Comment): any {
    const data = JSON.stringify(comment);
    return this.http.post('php/comments_set.php', data).map((r: Response) => r.json());
  }
}
