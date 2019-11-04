import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionsService} from './transactions.service';
import {AccountsService} from './accounts.service';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionDeleteComponent } from './transaction-delete/transaction-delete.component';
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [TransactionListComponent,
    TransactionEditComponent,
    TransactionDeleteComponent,
    PricePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransactionsRoutingModule
  ],
  providers: [TransactionsService, AccountsService],
  exports: [
    PricePipe
  ]
})
export class TransactionsModule { }
