import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    public router: Router,
    private loginservice: LoginService) { }

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
    this.router.navigate(['/forgot-password'])
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
    const userdata = {
      email: this.email,
      password: this.password
    }
    this.loginservice.login(userdata).subscribe({
      next: (response: any) => {
        console.log(response);

        console.log("success");
        this.loginservice.setLogin(response.token, response.userId)



        this.loginservice.autoLogout((response.expiresIn) * 1000)


        this.closePopup()

      },
      error: (err) => {
        alert(err.message)
      }
    })

  }
}
