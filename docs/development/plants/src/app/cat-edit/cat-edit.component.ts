import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { Settings } from '../settings';
import { CatsService } from '../cats.service';
import { CatsAdminService } from '../cats-admin.service';
import { Cat } from '../cat';
import { AppComponent } from '../app.component';

@Component({
  selector: 'plants-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['../user-edit/form.css', './cat-edit.component.css']
})
export class CatEditComponent implements OnInit {
  cat: Cat;

  constructor(private route: ActivatedRoute, private cs: CatsService,
  private cas: CatsAdminService, private router: Router, private title: Title,
  private ac: AppComponent) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cs.getCat(id).subscribe((cat: Cat) => {
        this.cat = cat;
      });
      this.title.setTitle('Правка :: Категории :: ' + Settings.title);
    } else {
      this.cat = new Cat();
      this.title.setTitle('Добавление :: Категории :: ' + Settings.title);
    }
  }

  private submitCat(): void {
    this.cas.setCat(this.cat).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/cat']);
        this.ac.nav.refreshCats();
      }
    });
  }
}
