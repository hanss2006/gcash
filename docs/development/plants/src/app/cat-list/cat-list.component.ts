import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { Settings } from '../settings';
import { Cat } from '../cat';
import { CatsService } from '../cats.service';

@Component({
  selector: 'plants-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['../user-list/user-list.component.css']
})
export class CatListComponent implements OnInit {
  cats: Observable<Cat[]>;

  constructor(private cs: CatsService, private title: Title) { }

  ngOnInit() {
    this.cats = this.cs.getCats();
    this.title.setTitle('Категории :: ' + Settings.title);
  }
}
