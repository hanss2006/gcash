import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { PlantBase } from '../plant-base';
import { Settings } from '../settings';
import { Cat } from '../cat';
import { Plant } from '../plant';
import { CatsService } from '../cats.service';
import { PlantsService } from '../plants.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'plants-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['../main/main.component.css', './plant-list.component.css']
})
export class PlantListComponent extends PlantBase implements OnInit {
  role: string = '';
  cat: Cat;
  plants: Plant[];
  pages: number = 1;
  __search: string = '';
  
  constructor(private as: AuthService, private route: ActivatedRoute, private cs: CatsService,
  private ps: PlantsService, private router: Router, private title: Title) {
    super();
  }

  ngOnInit() {
    this.as.getRole().subscribe((role: string) => { this.role = role; });
    this.route.queryParams.subscribe((qs) => {
      this.page = parseInt(qs.page || '1');
      this.search = qs.search || '';
      this.__search = this.search;
      if (this.cat) {
        this.getData(this.cat.id.toString());
      }
    });
    this.route.params.subscribe((ps) => {
      const cat: string = ps.cat;
      this.getData(cat);
      this.cs.getCat(cat).subscribe((cat: Cat) => {
        this.cat = cat;
        this.title.setTitle(cat.name + ' :: Каталог :: ' + Settings.title);
      });
    });
  }
  
  find() {
    this.search = this.__search;
    this.page = 1;
    this.router.navigate(['goods', this.cat.id], { queryParams: this.getPageParams(this.page) });
  }
  
  get __pages(): number[] {
    const pages: number[] = [];
    for (var i = 1; i <= this.pages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  private getData(cat: string): void {
    this.ps.getPlants(cat, this.page.toString(), this.search).subscribe((r) => {
      this.plants = r.data;
      this.pages = r.pages;
    });
  }
}
