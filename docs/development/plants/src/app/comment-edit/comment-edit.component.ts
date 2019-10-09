import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { PlantBase } from '../plant-base';
import { Settings } from '../settings';
import { CommentsService } from '../comments.service';
import { Comment } from '../comment';

@Component({
  selector: 'plants-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['../user-edit/form.css', './comment-edit.component.css']
})
export class CommentEditComponent extends PlantBase implements OnInit {
  comment: Comment;

  constructor(private route: ActivatedRoute, private cms: CommentsService,
  private router: Router, private title: Title) {
    super();
  }

  ngOnInit() {
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');
    this.search = this.route.snapshot.queryParamMap.get('search') || '';
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cms.getComment(id).subscribe((comment: Comment) => {
      this.comment = comment;
    });
    this.title.setTitle('Правка :: Комментарии :: ' + Settings.title);
  }

  private submitComment(): void {
    this.cms.setComment(this.comment).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/comment'], { queryParams: this.getPageParams(this.page) });
      }
    });
  }
}
