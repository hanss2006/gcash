import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatListComponent } from './cat-list/cat-list.component';
import { CatEditComponent } from './cat-edit/cat-edit.component';
import { CatDeleteComponent } from './cat-delete/cat-delete.component';

const appRoutes: Routes = [
  { path: '', children: [
    { path: 'create', component: CatEditComponent },
    { path: ':id/edit', component: CatEditComponent },
    { path: ':id/delete', component: CatDeleteComponent },
    { path: '', component: CatListComponent }
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
export class CatsRoutingModule { }
