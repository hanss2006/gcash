import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Settings } from '../settings';
import { Plant } from '../plant';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'plants-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  plants: Plant[];

  constructor(private ps: PlantsService, private title: Title) { }

  ngOnInit() {
    this.ps.getPlants().subscribe((r) => { this.plants = r; });
    this.title.setTitle('Главная :: ' + Settings.title);
  }
}
