import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { Settings } from '../settings';
import { CatsService } from '../cats.service';
import { CatsAdminService } from '../cats-admin.service';
import { Cat } from '../cat';
import { AppComponent } from '../app.component';

@Component({
  selector: 'plants-cat-delete',
  templateUrl: './cat-delete.component.html',
  styleUrls: ['../user-edit/form.css', './cat-delete.component.css']
})
export class CatDeleteComponent implements OnInit {
  cat: Cat;

  constructor(private route: ActivatedRoute, private cs: CatsService,
  private cas: CatsAdminService, private router: Router, private title: Title,
  private ac: AppComponent) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cs.getCat(id).subscribe((cat: Cat) => {
      this.cat = cat;
    });
    this.title.setTitle('Удаление :: Категории :: ' + Settings.title);
  }

  private deleteCat(): void {
    this.cas.deleteCat(this.cat.id).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/cat']);
        this.ac.nav.refreshCats();
      }
    });
  }
}
