import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { Settings } from '../settings';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'plants-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['../user-edit/form.css', './user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private us: UsersService,
  private router: Router, private title: Title) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.us.getUser(id).subscribe((user: User) => {
      this.user = user;
    });
    this.title.setTitle('Удаление :: Пользователи :: ' + Settings.title);
  }

  private deleteUser(): void {
    this.us.deleteUser(this.user.id).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/user']);
      }
    });
  }
}
