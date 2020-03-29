import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'

import { Settings } from '../settings';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../transaction';
import { AppComponent } from '../app.component';
import {TransactionBase} from '../transaction-base';
import {AccountsService} from '../accounts.service';
import {Account} from '../account';

@Component({
  selector: 'gcash-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent extends TransactionBase implements OnInit {
  transaction: Transaction;
  accounts: Account[];
  corrAccount: Account;
  currAccount: Account;
  currAccountGuid: string;
  guid: string;

  constructor(private route: ActivatedRoute, private ts: TransactionsService, private as: AccountsService,
              private router: Router, private title: Title,
              private ac: AppComponent,
              public datepipe: DatePipe) {
    super();
  }

  ngOnInit() {

    this.as.getAccounts().subscribe((accounts: Account[]) => {
      this.accounts = accounts;
    });

    this.route.params.subscribe(routeParams => {
      this.currAccountGuid = routeParams.account;
      this.guid = routeParams.guid;

      // const currAccountGuid = this.route.snapshot.paramMap.get('account');
      if (this.currAccountGuid){
        this.as.getAccount(this.currAccountGuid).subscribe((account: Account) => {
          this.currAccount = account;
        });
      } else {
        this.currAccount = new Account();
        this.currAccount.guid = this.currAccountGuid;
      }

      if (this.guid) { // this.router.url === '/transaction/create'
        this.ts.getTransaction(this.currAccountGuid, this.guid).subscribe((transaction: Transaction) => {
          this.transaction = transaction;
          this.as.getAccount(transaction.account).subscribe((account: Account) => {
            this.corrAccount = account;
            this.title.setTitle('Правка :: ' + account.name + ' :: ' + Settings.title);
          });
        });
        this.title.setTitle('Правка :: Проводки :: ' + Settings.title);
      } else {
        this.transaction = new Transaction();
        this.transaction.currentAccount = this.currAccountGuid;
        this.transaction.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        this.as.getAccount(this.currAccountGuid).subscribe((account: Account) => {
          this.currAccount = account;
          this.title.setTitle('Добавление :: ' + this.currAccount.name + ' :: ' + Settings.title);
        });
      }

    });

    this.route.queryParams.subscribe((qs) => {
      this.page = parseInt(qs.page || '1');
      this.search = qs.search || '';
    });
  }

  private submitTransaction(): void {
    this.ts.setTransaction(this.transaction).subscribe(response => {
      if (response.status === 1) {
        // this.router.navigate(['/transaction', {'account': this.currAccount.guid, 'page':this.page}]);
        this.router.navigateByUrl('transaction/account/' + this.currAccount.guid);
        // this.router.navigate(['account', this.currAccount.guid, 'page', 2]);
      }
    });
  }
}
