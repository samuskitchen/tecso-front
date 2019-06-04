import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { MatDialogRef } from '@angular/material';
import { Account } from 'src/app/model/account';
import { LegalPerson } from 'src/app/model/legalPerson';
import { PhysicalPerson } from 'src/app/model/physicalPerson';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {

  constructor(private accountService: AccountService,
    public dialogRef: MatDialogRef<AccountDialogComponent>) { }

  account: Account = new Account();
  submitted = false;
  radioGroupPerson: boolean;
  showLegalPerson: boolean;
  showPhysicalPerson: boolean;
  legalPerson: LegalPerson = new LegalPerson();
  physicalPerson: PhysicalPerson = new PhysicalPerson();
  isUpdateUp = false;
  isUpdateFailed = false;
  errorMessage = "";
  successMessage = "";

  ngOnInit() {
    if(this.account.legalPerson != null){
      this.showLegalPerson = true;
      this.showPhysicalPerson = false;
      
      this.legalPerson.id = this.account.legalPerson.id;
      this.legalPerson.businessName = this.account.legalPerson.businessName;
      this.legalPerson.foundationYear = this.account.legalPerson.foundationYear;
      this.legalPerson.rut = this.account.legalPerson.rut;
      this.legalPerson.active = this.account.legalPerson.active;
    }else{
      this.showLegalPerson = false;
      this.showPhysicalPerson = true;

      this.physicalPerson.id = this.account.physicalPerson.id;
      this.physicalPerson.name = this.account.physicalPerson.name;
      this.physicalPerson.surname = this.account.physicalPerson.surname;
      this.physicalPerson.documentType = this.account.physicalPerson.documentType;
      this.physicalPerson.numberDocument = this.account.physicalPerson.numberDocument;
      this.physicalPerson.rut = this.account.physicalPerson.rut;
      this.physicalPerson.active = this.account.physicalPerson.active;
    }
  }

  save() {
    this.accountService.updateAccount(this.account)
    .subscribe(
      data => {
        this.isUpdateUp = true;
        this.isUpdateFailed = false;
        this.successMessage = "Account Update Successfully";
        this.scrollTop();
      }, 
      error => {
        if(error['status'] && error['status'] == 200){
          this.isUpdateUp = true;
          this.isUpdateFailed = false;
          this.successMessage = "Account Update Successfully";
        } else {
          this.isUpdateUp = false;
          this.isUpdateFailed = true;
          this.errorMessage = error.error['text'];
        }
        this.scrollTop();
    });
  }

  update() {
    this.submitted = true;
    this.save();
  }

  onClose() {
    this.dialogRef.close();
  }

  scrollTop(): void{
    document.getElementById('account-dialog').scrollTo(0,0)
  }
}
