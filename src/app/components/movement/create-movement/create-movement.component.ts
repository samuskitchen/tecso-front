import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { Movement } from 'src/app/model/movement';
import { MovementService } from 'src/app/services/movement/movement.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.css']
})
export class CreateMovementComponent implements OnInit {

  constructor(private movementService: MovementService,
              public dialogRef: MatDialogRef<CreateMovementComponent>) { }

  account: Account = new Account();
  movement: Movement = new Movement();
  isCreateUp = false;
  isCreateFailed = false;
  errorMessage = "";
  successMessage = "";
  submitted = false;

  ngOnInit() {
  }

  newMovement(){
    this.movement = new Movement();
    this.isCreateUp = false;
    this.isCreateFailed = false;
  }

  create() {
    this.movement.account = this.account;
    this.submitted = true;
    this.save();
  }

  save() {
    this.movementService.createMovement(this.movement)
      .subscribe(
        data => {
          this.isCreateUp = true;
          this.isCreateFailed = false;
          this.movement = data; 
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

  onClose(){
    this.dialogRef.close();
  }

  scrollTop(): void{
    document.getElementById('movement-dialog').scrollTo(0,0);
  }
}
