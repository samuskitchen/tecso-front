import { AccountService } from "../../../services/account/account.service";
import { Account } from "../../../model/account";
import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { ListAccount } from 'src/app/model/listAccount';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { merge } from "rxjs";
import { tap } from 'rxjs/operators';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';
import { CreateMovementComponent } from '../../movement/create-movement/create-movement.component';
import { MovementListComponent } from '../../movement/movement-list/movement-list.component';

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

  constructor(private accountService: AccountService,
              private dialog: MatDialog,) { 
  }

  listData: MatTableDataSource<Account>;
  displayedColumns: string[] = ['numberAccount', 'currency', 'balance', 'accountType', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  accounType: string = "CORRIENTE";
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

  ngOnInit(): void{
    this.accountService.getAccountTypeList(this.accounType, null, 5)
    .subscribe(
      data => {
        this.listData = new MatTableDataSource(data.content);
        this.totalElements = data.totalElements;
        this.errorDisplay = false;
        this.successDisplay = false;
      },
      error => {
        this.errorDisplay = true;
        this.successDisplay = false;
        this.errorMessage = error.error['message'];
      });
  }

  ngAfterViewInit() : void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page).pipe(
        tap(() => {
          this.search();
          this.scrollTop();
        })
    ).subscribe();
  }

  search() {
    this.accountService.getAccountTypeList(this.accounType, this.paginator.pageIndex, this.paginator.pageSize)
    .subscribe(
      data => {
        this.listData = new MatTableDataSource(data.content);
        this.totalElements = data.totalElements;
        this.errorDisplay = false;
        this.successDisplay = false;
      },
      error => {
        this.errorDisplay = true;
        this.successDisplay = false;
        this.errorMessage = error.error['message'];
      });
  }

  onEdit(row: Account){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let dialogRef = this.dialog.open(AccountDialogComponent, dialogConfig);
    dialogRef.componentInstance.account = row;
    dialogRef.afterClosed().subscribe(result => {
      this.search();
      this.scrollTop();
    });
  }

  onMovement(row: Account){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let dialogRef = this.dialog.open(CreateMovementComponent, dialogConfig);
    dialogRef.componentInstance.account = row;
  }

  onListMovement(row: Account){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let dialogRef = this.dialog.open(MovementListComponent, dialogConfig);
    dialogRef.componentInstance.account = row;
  }

  deleteAccount(row: any) {
    this.accountService.deleteAccount(row.id)
      .subscribe(
        data => {
          this.successDisplay = true;
          this.errorDisplay = false;
          this.successMessage = data;
          //this.search();
          this.scrollTop();
        },
        error => {
          if(error['status'] && error['status'] == 200){
            this.successDisplay = true;
            this.errorDisplay = false;
            this.successMessage = "The account was successfully deleted";
            //this.search();
            this.scrollTop();
          } else {
            this.successDisplay = false;
            this.errorDisplay = true;
            this.errorMessage = error.error['message'];
          }
      });
  }

  scrollTop(): void{
    window.scrollTo(0, 0)
  }

}