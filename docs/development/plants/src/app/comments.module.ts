import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsAdminService } from './comments-admin.service';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { CommentDeleteComponent } from './comment-delete/comment-delete.component';

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule,
    FormsModule
  ],
  declarations: [CommentListComponent, CommentEditComponent, CommentDeleteComponent],
  providers: [CommentsAdminService]
})
export class CommentsModule { }
