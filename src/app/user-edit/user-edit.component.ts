import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { Settings } from '../settings';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'plants-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./form.css', './user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private us: UsersService,
  private router: Router, private title: Title) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.us.getUser(id).subscribe((user: User) => {
        this.user = user;
      });
      this.title.setTitle('Правка :: Пользователи :: ' + Settings.title);
    } else {
      this.user = new User();
      this.title.setTitle('Добавление :: Пользователи :: ' + Settings.title);
    }
  }

  private submitUser(): void {
    this.us.setUser(this.user).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/user']);
      }
    });
  }
}
