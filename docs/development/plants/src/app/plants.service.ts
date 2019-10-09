import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Settings } from './settings';
import { Plant } from './plant';

@Injectable()
export class PlantsService {
  constructor(private http: Http) { }

  getPlants(cat: string = '', page: string = '1', search: string = ''): any {
    const params = new URLSearchParams();
    if (cat != '') {
      params.set('cat', cat);
      params.set('page', page);
      params.set('count', Settings.pageCount.toString());
      if (search != '') {
        params.set('search', search);
      }
    }
    const options = new RequestOptions({ params: params });
    return this.http.get('php/plants_get.php', options).map((r: Response) => r.json())
    .catch((err, caught) => Observable.of([]));
  }

  getPlant(id: string): Observable<Plant> {
    const params = new URLSearchParams();
    params.set('id', id);
    const options = new RequestOptions({ params: params });
    return this.http.get('php/plants_get.php', options).map((r: Response) => r.json())
    .catch((err, caught) => Observable.of({}));
  }
}
