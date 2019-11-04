import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { StaticPageComponent } from './static-page/static-page.component';
import {AdminGuard} from './admin.guard';
import {RegisteredGuard} from './registered.guard';


const routes: Routes = [
  { path: 'auth', loadChildren: './auth.module#AuthModule' },
  { path: 'transaction', loadChildren: './transactions.module#TransactionsModule',
    canLoad: [RegisteredGuard] },
  { path: 'user', loadChildren: './users.module#UsersModule',
    canLoad: [AdminGuard] },
  {
    path: 'howtobuy', component: StaticPageComponent, data: {
      fileName: 'howtobuy.html',
      title: 'Оплата'
    }
  },
  {path: '', pathMatch: 'full', component: MainComponent},
  {
    path: '**', component: StaticPageComponent, data: {
      fileName: '404.html',
      title: 'Ошибка'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard, RegisteredGuard]
})
export class AppRoutingModule { }
