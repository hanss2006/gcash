import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PlantBase } from '../plant-base';
import { Settings } from '../settings';
import { Cat } from '../cat';
import { Plant } from '../plant';
import { CatsService } from '../cats.service';
import { PlantsService } from '../plants.service';
import { PlantsAdminService } from '../plants-admin.service';

@Component({
  selector: 'plants-plant-edit',
  templateUrl: './plant-edit.component.html',
  styleUrls: ['../user-edit/form.css', './plant-edit.component.css']
})
export class PlantEditComponent extends PlantBase implements OnInit {
  plant: Plant;
  cats: Observable<Cat[]>;

  constructor(private route: ActivatedRoute, private cs: CatsService,
  private ps: PlantsService, private pas: PlantsAdminService, private router: Router,
  private title: Title) {
    super();
  }

  ngOnInit() {
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');
    this.search = this.route.snapshot.queryParamMap.get('search') || '';
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cats = this.cs.getCats();
    if (id) {
      this.ps.getPlant(id).subscribe((plant: Plant) => {
        this.plant = plant;
        this.cs.getCat(plant.cat.toString()).subscribe((cat: Cat) => {
          this.title.setTitle('Правка :: ' + cat.name + ' :: ' + Settings.title);
        });
      });
    } else {
      const cat: string = this.route.snapshot.paramMap.get('cat');
      this.plant = new Plant();
      this.plant.cat = parseInt(cat);
      this.cs.getCat(cat).subscribe((cat: Cat) => {
        this.title.setTitle('Добавление :: ' + cat.name + ' :: ' + Settings.title);
      });
    }
  }

  private submitPlant(): void {
    this.pas.setPlant(this.plant).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/goods', this.plant.cat], { queryParams: this.getPageParams(this.page) });
      }
    });
  }
  
  private addPics(): void {
    if (this.plant.additionalPics2) {
      this.pas.addPics(this.plant.id, this.plant.additionalPics2).subscribe(response => {
        if (response.status === 1) {
          if (!this.plant.additionalPics) {
            this.plant.additionalPics = [];
          }
          for (var i = 0; i < response.data.length; i++) {
            this.plant.additionalPics.push(response.data[i]);
          }
          this.plant.additionalPics2 = null;
        }
      });
    }
  }
  
  private deletePic(evt: Event, id: number, index: number): void {
    if (window.confirm('Удалить изображение?')) {
      this.pas.deletePic(id).subscribe(response => {
        if (response.status === 1) {
          this.plant.additionalPics.splice(index, 1);
        }
      });
    }
    evt.preventDefault();
  }
}
