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
import { AccountTreeComponent } from './account-tree/account-tree.component';
import { MaterialAppModule } from './materialapp.module';
import {AccountTreeService} from './account-tree.service';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material';


@NgModule({
  declarations: [TransactionListComponent,
    TransactionEditComponent,
    TransactionDeleteComponent,
    PricePipe,
    AccountTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransactionsRoutingModule,
    MaterialAppModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true} },
    TransactionsService,
    AccountsService,
    AccountTreeService
  ],
  exports: [
    PricePipe
  ]
})
export class TransactionsModule { }
