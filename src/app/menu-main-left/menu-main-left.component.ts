import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'gcash-menu-main-left',
  templateUrl: './menu-main-left.component.html',
  styleUrls: ['./menu-main-left.component.css']
})
export class MenuMainLeftComponent implements OnInit {
  role: string = '';

  constructor(private as: AuthService) { }

  ngOnInit() {
    this.refreshRole();
  }

  refreshRole(): void{
    this.as.getRole().subscribe((role: string)=>{this.role=role;});
  }


}
