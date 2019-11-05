import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { Settings } from '../settings';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../transaction';
import { AppComponent } from '../app.component';


@Component({
  selector: 'gcash-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.css']
})
export class TransactionDeleteComponent implements OnInit {
  transaction: Transaction;
  currAccountGuid: string;

  constructor(private route: ActivatedRoute, private ts: TransactionsService,
              private router: Router, private title: Title,
              private ac: AppComponent) { }

  ngOnInit() {
    const guid: string = this.route.snapshot.paramMap.get('guid');
    this.currAccountGuid = this.route.snapshot.paramMap.get('account');

    // TODO: текущий счет
    this.ts.getTransaction('4cb873379b39e82a3d16e0f4082dd916', guid).subscribe((transaction: Transaction) => {
      this.transaction = transaction;
    });
    this.title.setTitle('Удаление :: Проводки :: ' + Settings.title);
  }
  private deleteTransaction(): void {
    this.ts.deleteTransactions(this.transaction.guid).subscribe(response => {
      if (response.status === 1) {
        //this.router.navigate(['/transaction']);
        this.router.navigateByUrl('transaction/account/' + this.currAccountGuid);
      }
    });
  }

}
