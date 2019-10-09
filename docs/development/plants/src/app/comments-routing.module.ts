import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { CommentDeleteComponent } from './comment-delete/comment-delete.component';

const appRoutes: Routes = [
  { path: '', children: [
    { path: ':id/edit', component: CommentEditComponent },
    { path: ':id/delete', component: CommentDeleteComponent },
    { path: '', component: CommentListComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CommentsRoutingModule { }
