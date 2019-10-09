import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlantsRoutingModule } from './plants-routing.module';
import { PlantsAdminService } from './plants-admin.service';
import { PlantEditComponent } from './plant-edit/plant-edit.component';
import { PlantDeleteComponent } from './plant-delete/plant-delete.component';

@NgModule({
  imports: [
    CommonModule,
    PlantsRoutingModule,
    FormsModule
  ],
  declarations: [PlantEditComponent, PlantDeleteComponent],
  providers: [PlantsAdminService]
})
export class PlantsModule { }
