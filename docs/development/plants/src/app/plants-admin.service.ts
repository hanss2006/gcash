import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Plant } from './plant';

@Injectable()
export class PlantsAdminService {
  constructor(private http: Http) { }

  setPlant(plant: Plant): any {
    const data: FormData = new FormData();
    data.append('id', plant.id.toString());
    data.append('name', plant.name);
    data.append('short', plant.short);
    data.append('lng', plant.lng);
    data.append('price', plant.price.toString());
    data.append('featured', plant.featured ? '1' : '0');
    data.append('cat', plant.cat.toString());
    if (plant.mainPic2) {
      data.append('mainpic', plant.mainPic2, plant.mainPic2.name);
    }
    if (plant.additionalPics2) {
      for (var i = 0; i < plant.additionalPics2.length; i++) {
        data.append('additionalpics[]', plant.additionalPics2[i], plant.additionalPics2[i].name);
      }
    }
    return this.http.post('php/plants_set.php', data).map((r: Response) => r.json());
  }

  addPics(id: number, pics: File[]): any {
    const data: FormData = new FormData();
    data.append('id', id.toString());
    for (var i = 0; i < pics.length; i++) {
      data.append('additionalpics[]', pics[i], pics[i].name);
    }
    data.append('mode', 'addpics');
    return this.http.post('php/plants_set.php', data).map((r: Response) => r.json());
  }

  deletePic(id: number): any {
    const data: FormData = new FormData();
    data.append('id', id.toString());
    data.append('mode', 'deletepic');
    return this.http.post('php/plants_set.php', data).map((r: Response) => r.json());
  }

  deletePlant(id: number): any {
    const data: FormData = new FormData();
    data.append('id', id.toString());
    data.append('mode', 'delete');
    return this.http.post('php/plants_set.php', data).map((r: Response) => r.json());
  }
}
