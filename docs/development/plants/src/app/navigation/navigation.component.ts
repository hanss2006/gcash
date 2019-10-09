import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';
import { CatsService } from '../cats.service';

import { Cat } from '../cat';

@Component({
  selector: 'plants-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  role: string = '';
  cats: Observable<Cat[]>;

  constructor(private as: AuthService, private cs: CatsService) { }

  ngOnInit() {
    this.refreshRole();
    this.refreshCats();
  }
  
  refreshRole(): void {
    this.as.getRole().subscribe((role: string) => { this.role = role; });
  }
  
  refreshCats(): void {
    this.cats = this.cs.getCats();
  }
}
