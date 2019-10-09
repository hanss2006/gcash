import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { Settings } from '../settings';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'plants-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private us: UsersService, private title: Title) { }

  ngOnInit() {
    this.users = this.us.getUsers();
    this.title.setTitle('Пользователи :: ' + Settings.title);
  }
}
