import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionDeleteComponent } from './transaction-delete/transaction-delete.component';
import {AccountTreeComponent} from './account-tree/account-tree.component';

const appRoutes: Routes = [
  { path: '', children: [
      { path: 'create/account/:account', component: TransactionEditComponent },
      { path: 'guid/:guid/edit/account/:account', component: TransactionEditComponent },
      { path: 'guid/:guid/delete/account/:account', component: TransactionDeleteComponent },
      // { path: 'account/:account', component: TransactionListComponent },
      { path: 'account/:account', component: TransactionListComponent },
      { outlet: 'left', path: '', component: AccountTreeComponent }
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TransactionsRoutingModule { }
