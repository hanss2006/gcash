import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {AccountTreeService} from '../account-tree.service';
import {AccountTree} from '../account-tree';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


/** Flat node with expandable and level information */
interface AccountFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'gcash-account-tree',
  templateUrl: './account-tree.component.html',
  styleUrls: ['./account-tree.component.css']
})

export class AccountTreeComponent implements OnInit {

  constructor(private ats: AccountTreeService, private router: Router) {
  }

  load(accountGuid){
    console.log(accountGuid);
    this.router.navigate(['transaction/account', accountGuid]);
  }

treeControl = new FlatTreeControl<AccountFlatNode>(
    node => node.level, node => node.expandable);

  private _transformer = (node: AccountTree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      value: node.guid,
      level,
    };
  }

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  ngOnInit() {
    this.ats.getAccountTree().subscribe((accountTrees: AccountTree) => {
      this.dataSource.data = accountTrees.children;
    });
  }

  hasChild = (_: number, node: AccountFlatNode) => node.expandable;

}
