import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CatsRoutingModule } from './cats-routing.module';
import { CatsAdminService } from './cats-admin.service';
import { CatListComponent } from './cat-list/cat-list.component';
import { CatEditComponent } from './cat-edit/cat-edit.component';
import { CatDeleteComponent } from './cat-delete/cat-delete.component';
import { MinDirective } from './min.directive';

@NgModule({
  imports: [
    CommonModule,
    CatsRoutingModule,
    FormsModule
  ],
  declarations: [CatListComponent, CatEditComponent, CatDeleteComponent, MinDirective],
  providers: [CatsAdminService]
})
export class CatsModule { }
