import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginService } from '../../services/login.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  loggedIn:Boolean=false
  @Input() backgroundColor:String = 'none'
  ngOnInit(): void {
    this.loginservice.loggedIn$.subscribe(loggedIn=>{
      this.loggedIn = loggedIn
    })
  }
  constructor(public dialog:MatDialog,private loginservice:LoginService,private router:Router){}

  showLoginPopup(){
    const dialogRef = this.dialog.open(LoginComponent,{width:'300px'})
  }
  showSignupPopup(){
    const dialogRef = this.dialog.open(SignupComponent,{width:'300px'})
  }
  logout(){
    this.loginservice.setLogout()
    this.router.navigate(['/'])

  }
  profile(){
    console.log("working");
    this.router.navigate(['/profile'])
    
  }
  predict(){
    this.router.navigate(['/upload-data'])
    
  }
}
