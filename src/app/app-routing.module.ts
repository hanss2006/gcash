import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {StaticPageComponent} from './static-page/static-page.component';
import {AdminGuard} from './admin.guard';
import {RegisteredGuard} from './registered.guard';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {AccountTreeComponent} from './account-tree/account-tree.component';
import {MenuMainLeftComponent} from './menu-main-left/menu-main-left.component';


const routes: Routes = [
  {path: 'auth', loadChildren: './auth.module#AuthModule'},
  {
    path: 'transaction', loadChildren: './transactions.module#TransactionsModule',
    canLoad: [RegisteredGuard]
  },
  {
    path: 'user', loadChildren: './users.module#UsersModule',
    canLoad: [AdminGuard]
  },
  {
    path: 'howtobuy',
    children: [
      // свойство outlet используется для назначения router-outlet
      {
        outlet: 'primary', path: '', component: StaticPageComponent, data: {
          fileName: 'howtobuy.html',
          title: 'Оплата'
        }
      },
      {outlet: 'left', path: '', component: MenuMainLeftComponent}
    ]
  },
  {
    path: '', pathMatch: 'full',
    children: [
      // свойство outlet используется для назначения router-outlet
      {outlet: 'primary', path: '', component: MainComponent},
      {outlet: 'left', path: '', component: MenuMainLeftComponent}
    ]
  },
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
export class AppRoutingModule {
}
