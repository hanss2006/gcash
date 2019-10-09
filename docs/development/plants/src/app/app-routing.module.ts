import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AdminGuard } from './admin.guard';
import { RegisteredGuard } from './registered.guard';
import { StaticPageComponent } from './static-page/static-page.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';

const appRoutes: Routes = [
  { path: 'auth', loadChildren: 'app/auth.module#AuthModule' },
  { path: 'cat', loadChildren: 'app/cats.module#CatsModule',
  canLoad: [RegisteredGuard] },
  { path: 'user', loadChildren: 'app/users.module#UsersModule',
  canLoad: [AdminGuard] },
  { path: 'plant', loadChildren: 'app/plants.module#PlantsModule',
  canLoad: [RegisteredGuard] },
  { path: 'comment', loadChildren: 'app/comments.module#CommentsModule',
  canLoad: [RegisteredGuard] },
  { path: 'goods/:cat/:id', component: PlantDetailComponent },
  { path: 'goods/:cat', component: PlantListComponent },
  { path: 'howtobuy', component: StaticPageComponent, data: {
    fileName: 'howtobuy.html',
    title: 'Оплата'
  }},
  { path: 'about', component: StaticPageComponent, data: {
    fileName: 'about.html',
    title: 'О фирме'
  }},
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: '**', component: StaticPageComponent, data: {
    fileName: '404.html',
    title: 'Ошибка'
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AdminGuard, RegisteredGuard]
})
export class AppRoutingModule { }
