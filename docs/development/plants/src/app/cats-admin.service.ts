import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cat } from './cat';

@Injectable()
export class CatsAdminService {
  constructor(private http: Http) { }

  setCat(cat: Cat): any {
    const data = JSON.stringify(cat);
    return this.http.post('php/cats_set.php', data).map((r: Response) => r.json());
  }

  deleteCat(id: number): any {
    const data = JSON.stringify({ id: id, mode: 'delete' });
    return this.http.post('php/cats_set.php', data).map((r: Response) => r.json());
  }
}
