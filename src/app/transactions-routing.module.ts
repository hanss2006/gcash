import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionDeleteComponent } from './transaction-delete/transaction-delete.component';

const appRoutes: Routes = [
  { path: '', children: [
      { path: 'create', component: TransactionEditComponent },
      { path: ':guid/edit/account/4cb873379b39e82a3d16e0f4082dd916', component: TransactionEditComponent },
      { path: ':guid/delete/account/:account', component: TransactionDeleteComponent },
      { path: 'account/:account', component: TransactionListComponent }
      // ,{ path: '', component: TransactionListComponent }
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
