import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  passwordInputFocused: boolean = false;
  password: string = '';
  token: string | null = ''; // Variable to store the token
  constructor(private route:ActivatedRoute,private resetpassword:ResetPasswordService,private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe({
      next:(params:any)=>{
        console.log(params);
        
         this.token = params.token
      }
    })
  }
  
  resetPassword(): void {
    // Ensure the token is present
    if (!this.token) {
      console.error('Token is missing');
      return;
    }
    if(this.password.length<6){
      return;
    }
    this.resetpassword.reset(this.token,this.password).subscribe({
      next:(response)=>{
        console.log("password updated successfully");
        alert("password updated successfully")
        this.router.navigate(['/'])

        
      },
      error:(err)=>{
        alert("There is a problem while reseting the password")
        this.router.navigate(['/forgot-password'])
        console.log(err);
        
      }
    })

  }
}
