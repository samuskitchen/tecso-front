import { Observable } from "rxjs";
import { AccountService } from "../../account.service";
import { Account } from "../../account";
import { ListAccount } from '../../listAccount';
import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})

export class AccountListComponent implements OnInit {
  accounts: Account[];
  contents: Account[];
  errorMessage = '';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.reloadData("CORRIENTE", 0, 10);
  }

  reloadData(accounType: string, page: number, size: number) {
    this.accountService.getAccountTypeList(accounType, page, size).subscribe(
      data => {
        this.contents = data.content;
        console.log(data)
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData("CORRIENTE", 0, 10);
        },
        error => console.log(error));
  }
}
