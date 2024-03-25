import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public dialogRef:MatDialogRef<LoginComponent>,
    public dialog:MatDialog,
    public router:Router){}

    // Close the dialog
    closePopup(): void {
      this.dialogRef.close();
    }
    openPopup(): void {
      // Close the current dialog
      this.closePopup();
      // Open the login dialog
      const dialogRef = this.dialog.open(SignupComponent, {
        width: '300px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        // Log when the popup is closed
        console.log('The popup was closed');
      });
    }
    navigateToForgotPassword() {
      this.router.navigate(['/'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
      this.closePopup()
    }

    email: string = ''; // Initialize email variable
    emailInputFocused: boolean = false; // Track if email input is focused
    passwordInputFocused: boolean = false; // Track if password input is focused
    password: string = ''; // Initialize password variable

    onContinueClick(): void {
      console.log("clicked");
      
    }
}
