import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public dialog:MatDialog){}

  showLoginPopup(){
    const dialogRef = this.dialog.open(LoginComponent,{width:'300px'})
  }
  showSignupPopup(){
    const dialogRef = this.dialog.open(SignupComponent,{width:'300px'})
  }
}
