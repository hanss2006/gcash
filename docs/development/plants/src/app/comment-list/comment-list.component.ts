import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { PlantBase } from '../plant-base';
import { Settings } from '../settings';
import { Comment } from '../comment';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'plants-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['../plant-list/plant-list.component.css', './comment-list.component.css']
})
export class CommentListComponent extends PlantBase implements OnInit {
  comments: Comment[];
  pages: number = 1;
  __search: string = '';
  
  constructor(private route: ActivatedRoute, private cs: CommentsService,
  private router: Router, private title: Title) {
    super();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((qs) => {
      this.page = parseInt(qs.page || '1');
      this.search = qs.search || '';
      this.__search = this.search;
      this.getData();
    });
    this.route.params.subscribe((ps) => {
      this.getData();
    });
    this.title.setTitle('Комментарии :: ' + Settings.title);
  }
  
  find() {
    this.search = this.__search;
    this.page = 1;
    this.router.navigate(['comment'], { queryParams: this.getPageParams(this.page) });
  }
  
  get __pages(): number[] {
    const pages: number[] = [];
    for (var i = 1; i <= this.pages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  private getData(): void {
    this.cs.getComments('', this.page.toString(), this.search).subscribe((r) => {
      this.comments = r.data;
      this.pages = r.pages;
    });
  }
}
