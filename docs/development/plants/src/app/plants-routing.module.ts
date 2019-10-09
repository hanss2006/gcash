import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlantEditComponent } from './plant-edit/plant-edit.component';
import { PlantDeleteComponent } from './plant-delete/plant-delete.component';

const appRoutes: Routes = [
  { path: '', children: [
    { path: ':cat/create', component: PlantEditComponent },
    { path: ':id/edit', component: PlantEditComponent },
    { path: ':id/delete', component: PlantDeleteComponent }
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
export class PlantsRoutingModule { }
