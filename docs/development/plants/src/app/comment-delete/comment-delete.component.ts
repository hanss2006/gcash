import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { PlantBase } from '../plant-base';
import { Settings } from '../settings';
import { CommentsService } from '../comments.service';
import { CommentsAdminService } from '../comments-admin.service';
import { Comment } from '../comment';

@Component({
  selector: 'plants-comment-delete',
  templateUrl: './comment-delete.component.html',
  styleUrls: ['../user-edit/form.css', './comment-delete.component.css']
})
export class CommentDeleteComponent extends PlantBase implements OnInit {
  comment: Comment;

  constructor(private route: ActivatedRoute, private cms: CommentsService,
  private cmas: CommentsAdminService, private router: Router, private title: Title) {
    super();
  }

  ngOnInit() {
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');
    this.search = this.route.snapshot.queryParamMap.get('search') || '';
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cms.getComment(id).subscribe((comment: Comment) => {
      this.comment = comment;
    });
    this.title.setTitle('Удаление :: Комментарии :: ' + Settings.title);
  }

  private deleteComment(): void {
    this.cmas.deleteComment(this.comment.id).subscribe(response => {
      if (response.status === 1) {
        this.router.navigate(['/comment'], { queryParams: this.getPageParams(this.page) });
      }
    });
  }
}
