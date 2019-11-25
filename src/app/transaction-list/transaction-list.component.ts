import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TransactionBase } from '../transaction-base';
import { Settings } from '../settings';
import { Transaction } from '../transaction';
import { TransactionsService } from '../transactions.service';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '../account';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'gcash-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent  extends TransactionBase implements OnInit {
  account: Account;
  transactions: Transaction[];
  pages: number = 1;
  __search: string = '';

  constructor(private ts: TransactionsService, private acs: AccountsService, private title: Title,
              private as: AuthService, private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
    // TODO: Провести текущий счет
    this.title.setTitle('Проводки :: ' + Settings.title);
    //let currAccountGuid = this.route.snapshot.paramMap.get('account');

    this.route.params.subscribe(routeParams => {
      const currAccountGuid = routeParams.account;
      this.acs.getAccount(currAccountGuid).subscribe((account: Account) => {
        this.account = account;
        this.title.setTitle(account.name + ' :: Счет :: ' + Settings.title);
        this.getData(this.account);

        this.route.queryParams.subscribe((qs) => {
          this.page = parseInt(qs.page || '1');
          this.search = qs.search || '';
          this.__search = this.search;
        });
      });
    });
  }

  find() {
    this.search = this.__search;
    this.page = 1;
    this.router.navigate(['transaction/account', this.account.guid], { queryParams: this.getPageParams(this.page) });
  }
  get __pages(): number[] {
    const pages: number[] = [];
    for (var i = 1; i <= this.pages; i++) {
      pages.push(i);
    }
    return pages;
  }
  private getData(account: Account): void {
    if (account) {
      this.ts.getTransactions(account.guid, this.page.toString(), this.search).subscribe((r) => {
        this.transactions = r.data;
        this.pages = r.pages;
      });
    }
  }

}
