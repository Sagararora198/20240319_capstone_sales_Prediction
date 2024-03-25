import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(public dialog:MatDialog,public dialogRef:MatDialogRef<SignupComponent>){}
    // Method to close the signup popup
    closePopup(): void {
      this.dialogRef.close();
    }
      // Method to show login popup
  showLoginPopup(): void {
    this.closePopup();
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
    });
      // Handling the closure of the login popup
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The popup was closed');
      });
    }
    // Initializing variables and form controls for user inputs
  username: string = '';
  usernameInputFocused: boolean = false;
  fullName: string = '';

  fullNameInputFocused: boolean = false;
  emailInputFocused: boolean = false;
  phoneNumberInputFocused: boolean = false;
  passwordInputFocused: boolean = false;
  email: string = '';
  phoneNumber: string = '';
  password: string = '';


  onContinueClick(): void {

    console.log("working");
    
  }
}
