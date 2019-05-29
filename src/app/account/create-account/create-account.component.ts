import { AccountService } from '../../account.service';
import { Account } from '../../account';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account: Account = new Account();
  submitted = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  newAccount(): void {
    this.submitted = false;
    this.account = new Account();
  }

  save() {
    this.accountService.createAccount(this.account)
      .subscribe(data => {this.account = data; console.log(data)}, error => console.log(error));
    //this.account = new Account();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
