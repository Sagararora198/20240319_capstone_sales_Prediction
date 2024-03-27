import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  passwordInputFocused: boolean = false;
  password: string = '';
  token: string | null = ''; // Variable to store the token

  resetPassword(): void {
    // Ensure the token is present
    if (!this.token) {
      console.error('Token is missing');
      return;
    }
  }
}
