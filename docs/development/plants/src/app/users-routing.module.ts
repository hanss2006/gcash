import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

const appRoutes: Routes = [
  { path: '', children: [
    { path: 'create', component: UserEditComponent },
    { path: ':id/edit', component: UserEditComponent },
    { path: ':id/delete', component: UserDeleteComponent },
    { path: '', component: UserListComponent }
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
export class UsersRoutingModule { }
