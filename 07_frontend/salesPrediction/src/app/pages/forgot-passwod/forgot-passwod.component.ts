import { Component } from '@angular/core';

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
  constructor() {}

  //when button it clicked 
  forgetPassword(): void {

    console.log("forgot");
    
  }
}
