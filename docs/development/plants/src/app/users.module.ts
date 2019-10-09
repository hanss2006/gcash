import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ],
  declarations: [UserListComponent, UserEditComponent, UserDeleteComponent],
  providers: [UsersService]
})
export class UsersModule { }
