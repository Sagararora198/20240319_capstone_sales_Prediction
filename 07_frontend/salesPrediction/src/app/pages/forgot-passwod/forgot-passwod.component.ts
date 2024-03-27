import { Component } from '@angular/core';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-passwod',
  templateUrl: './forgot-passwod.component.html',
  styleUrl: './forgot-passwod.component.css'
})
export class ForgotPasswodComponent {
  emailInputFocused: boolean = false;
  navbackground:string = '#211E1E'
  
  // String variable to store the user's email
  email: string = '';
  constructor(private forgotpassword:ForgotPasswordService,private router:Router) {}

  //when button it clicked 
  forgetPassword(): void {

    const userData = {
      email:this.email
    }
    this.forgotpassword.forgotPassword(userData).subscribe({
      next:(response:any)=>{
        console.log(response)
        alert("Password reset instructions sent")
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
}
