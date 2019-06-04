import { AccountService } from "../../../services/account/account.service";
import { Account } from '../../../model/account';
import { Component, OnInit } from '@angular/core';
import { LegalPerson } from 'src/app/model/legalPerson';
import { PhysicalPerson } from 'src/app/model/physicalPerson';
import { FormControl, Validators } from '@angular/forms';

export interface AccountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  account: Account = new Account();
  submitted = false;
  radioGroupPerson: boolean;
  showLegalPerson: boolean;
  showPhysicalPerson: boolean;
  legalPerson: LegalPerson = new LegalPerson();
  physicalPerson: PhysicalPerson = new PhysicalPerson();
  isCreateUp = false;
  isCreateFailed = false;
  errorMessage = "";
  successMessage = "";

  accounType: string;
  accounTypeControl = new FormControl('', [Validators.required]);
  accounTypes: AccountType[] = [
    {value: 'CORRIENTE', viewValue: 'Current'},
    {value: 'AHORROS', viewValue: 'Savings'}
  ];

  ngOnInit() {
    this.showLegalPerson = false;
    this.showPhysicalPerson = false;
  }

  newAccount(): void {
    this.submitted = false;
    this.account = new Account();
    this.legalPerson = new LegalPerson();
    this.physicalPerson = new PhysicalPerson();
    this.legalPerson.active = false;
    this.physicalPerson.active = false;
    this.showLegalPerson = false;
    this.showPhysicalPerson = false;
    this.isCreateUp = false;
    this.isCreateFailed = false;
    this.account.currency = "";
    this.account.accountType = "";
  }

  save() {
    this.accountService.createAccount(this.account)
      .subscribe(
        data => {
          this.isCreateUp = true;
          this.isCreateFailed = false;
          this.account = data; 
          this.successMessage = "Account created successfully";
          this.scrollTop();
        }, 
        error => {
          this.isCreateUp = false;
          this.isCreateFailed = true;
          this.errorMessage = error.error['message'];
          this.scrollTop();
        });
  }

  create() {
    this.account.legalPerson = this.legalPerson;
    this.account.physicalPerson = this.physicalPerson;
    this.submitted = true;
    this.save();
  }

  selectTypePerson(): void{
    if(this.radioGroupPerson){
      this.showLegalPerson = true;
      this.showPhysicalPerson = false;
      this.physicalPerson = null;
      this.legalPerson.active = true;
      this.legalPerson = new LegalPerson();
    }else{
      this.showLegalPerson = false;
      this.showPhysicalPerson = true;
      this.legalPerson = null;
      this.physicalPerson.active = true;
      this.physicalPerson = new PhysicalPerson();
    }
  }

  scrollTop(): void{
    window.scrollTo(0, 0);
  }
}
