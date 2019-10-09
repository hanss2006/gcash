import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Comment } from './comment';

@Injectable()
export class CommentsAdminService {
  constructor(private http: Http) { }

  deleteComment(id: number): any {
    const data = JSON.stringify({ id: id, mode: 'delete' });
    return this.http.post('php/comments_set.php', data).map((r: Response) => r.json());
  }
}
