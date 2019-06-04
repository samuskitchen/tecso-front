import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogRef } from '@angular/material';
import { Movement } from 'src/app/model/movement';
import { ListMovement } from 'src/app/model/listMovement';
import { MovementService } from 'src/app/services/movement/movement.service';
import { merge } from "rxjs";
import { tap } from 'rxjs/operators';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.css']
})
export class MovementListComponent implements OnInit, AfterViewInit {

  constructor(private movementService: MovementService,
              public dialogRef: MatDialogRef<MovementListComponent>) { }


  listData: MatTableDataSource<Movement>;
  displayedColumns: string[] = ['date', 'typeMovement', 'description', 'amount'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  account: Account = new Account();
  totalElements: number = 0;
  accounts: ListMovement;
  errorMessage = "";
  successMessage = "";
  errorDisplay: boolean;
  successDisplay: boolean;


  ngOnInit() {
    this.movementService.getMovementByAccountList(this.account.id, null, 5)
    .subscribe(
      data => {
        this.listData = new MatTableDataSource(data.content);
        this.totalElements = data.totalElements;
        this.errorDisplay = false;
      },
      error => {
        this.errorDisplay = true;
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
    this.movementService.getMovementByAccountList(this.account.id, this.paginator.pageIndex, this.paginator.pageSize)
    .subscribe(
      data => {
        this.listData = new MatTableDataSource(data.content);
        this.totalElements = data.totalElements;
        this.errorDisplay = false;
      },
      error => {
        this.errorDisplay = true;
        this.errorMessage = error.error['message'];
      });
  }

  onClose() {
    this.dialogRef.close();
  }

  scrollTop(): void{
    document.getElementById('movement-dialog').scrollTo(0,0)
  }

}
