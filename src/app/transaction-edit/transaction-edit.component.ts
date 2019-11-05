import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private ts: TransactionsService, private as: AccountsService,
              private router: Router, private title: Title,
              private ac: AppComponent) {
    super();
  }

  ngOnInit() {
    const guid: string = this.route.snapshot.paramMap.get('guid');
    this.as.getAccounts().subscribe((accounts: Account[]) => {
      this.accounts = accounts;
    });

    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');
    this.search = this.route.snapshot.queryParamMap.get('search') || '';

    const currAccountGuid = this.route.snapshot.paramMap.get('account');
    if (currAccountGuid){
      this.as.getAccount(currAccountGuid).subscribe((account: Account) => {
        this.currAccount = account;
      });
    } else {
      this.currAccount = new Account();
      this.currAccount.guid = currAccountGuid;
    }

    if (guid) { // this.router.url === '/transaction/create'
      this.ts.getTransaction(currAccountGuid, guid).subscribe((transaction: Transaction) => {
        this.transaction = transaction;
        this.as.getAccount(transaction.account).subscribe((account: Account) => {
          this.corrAccount = account;
          this.title.setTitle('Правка :: ' + account.name + ' :: ' + Settings.title);
        });
      });
      this.title.setTitle('Правка :: Проводки :: ' + Settings.title);
    } else {
      this.transaction = new Transaction();
      this.transaction.currentAccount = currAccountGuid;
      this.as.getAccount(currAccountGuid).subscribe((account: Account) => {
        this.currAccount = account;
        this.title.setTitle('Добавление :: ' + this.currAccount.name + ' :: ' + Settings.title);
      });
    }
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
