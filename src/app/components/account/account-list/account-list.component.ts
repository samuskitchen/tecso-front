import { AccountService } from "../../../services/account/account.service";
import { Account } from "../../../model/account";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ListAccount } from 'src/app/model/listAccount';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { merge } from "rxjs";
import { tap } from 'rxjs/operators';


export interface AccountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class AccountListComponent implements OnInit, AfterViewInit{

  constructor(private accountService: AccountService) { 
  }

  listData: MatTableDataSource<Account>;
  displayedColumns: string[] = ['numberAccount', 'currency', 'balance', 'accountType', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  accounType: string;
  totalElements: number = 0;
  accounts: ListAccount;
  errorMessage = "";
  successMessage = "";
  errorDisplay: boolean;
  successDisplay: boolean;

  accounTypeControl = new FormControl('', [Validators.required]);
  accounTypes: AccountType[] = [
    {value: 'CORRIENTE', viewValue: 'Current'},
    {value: 'AHORROS', viewValue: 'Savings'}
  ];

  
  ngOnInit() {
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page).pipe(
        tap(() => this.search())
    ).subscribe();
  }

  search() {
    this.accountService.getAccountTypeList(this.accounType, this.paginator.pageIndex, this.paginator.pageSize)
    .subscribe(
      data => {
        this.listData = new MatTableDataSource(data.content);
        this.totalElements = data.totalElements;
        this.errorDisplay = false;
      },
      error => {
        this.errorDisplay = true;
        this.errorMessage = error.error['message'];
      }
    );
  }

  deleteAccount(row: any) {
    this.accountService.deleteAccount(row.id)
      .subscribe(
        data => {
          this.successDisplay = true;
          this.errorDisplay = false;
          this.search();
          this.successMessage = data;
        },
        error => {
          this.successDisplay = false;
          this.errorDisplay = true;
          this.errorMessage = error.error['message'];
        })
  }
}
