import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { PlantBase } from '../plant-base';
import { Settings } from '../settings';
import { Cat } from '../cat';
import { Plant } from '../plant';
import { CatsService } from '../cats.service';
import { PlantsService } from '../plants.service';
import { PlantsAdminService } from '../plants-admin.service';

@Component({
  selector: 'plants-plant-delete',
  templateUrl: './plant-delete.component.html',
  styleUrls: ['../user-edit/form.css', './plant-delete.component.css']
})
export class PlantDeleteComponent extends PlantBase implements OnInit {
  plant: Plant;

  constructor(private route: ActivatedRoute, private cs: CatsService,
  private ps: PlantsService, private pas: PlantsAdminService, private router: Router,
  private title: Title) {
    super();
  }

  ngOnInit() {
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');
    this.search = this.route.snapshot.queryParamMap.get('search') || '';
    const id: string = this.route.snapshot.paramMap.get('id');
    this.ps.getPlant(id).subscribe((plant: Plant) => {
      this.plant = plant;
      this.cs.getCat(plant.cat.toString()).subscribe((cat: Cat) => {
        this.title.setTitle('Удаление :: ' + cat.name + ' :: ' + Settings.title);
      });
    });
  }

  private deletePlant(): void {
    this.pas.deletePlant(this.plant.id).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/goods', this.plant.cat], { queryParams: this.getPageParams(this.page) });
      }
    });
  }
}
