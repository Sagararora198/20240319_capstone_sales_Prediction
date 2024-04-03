import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private userProfile:UserProfileService){}

  navbarColor:string = "#211E1E"
  user = {
    userName: 'JohnDoe',
    email: 'john.doe@example.com'
    // Add more fields as needed
  };
  ngOnInit(): void {
    this.userProfile.getUser().subscribe({
      next:(response:any)=>{
        this.user = response
        console.log(response);
        


      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

}
