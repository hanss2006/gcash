import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'gcash-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  role: string = '';

  constructor(private as: AuthService) { }

  ngOnInit() {
    this.refreshRole();
  }
  refreshRole(): void{
    this.as.getRole().subscribe((role: string)=>{this.role=role;});
  }

}
