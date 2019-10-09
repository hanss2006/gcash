import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Settings } from '../settings';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'plants-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['../user-edit/form.css', './logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private as: AuthService, private router: Router, private title: Title,
  private ac: AppComponent) { }

  ngOnInit() {
    this.title.setTitle('Выход :: ' + Settings.title);
  }

  logout(): void {
    this.as.logout().subscribe((role: string) => {
      if (role === "") {
        this.router.navigate(['']);
        this.ac.nav.refreshRole();
      }
    });
  }
}
