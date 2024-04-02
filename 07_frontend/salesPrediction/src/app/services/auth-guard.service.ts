import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  
  isLoggedIn:boolean = false
    constructor(private authService:LoginService,private router:Router){
        
        this.authService.loggedIn$.subscribe(loggedIn=>{
            this.isLoggedIn = loggedIn
        })
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.isLoggedIn){
            return true
        }
        else{
            this.router.navigate(['/'])
            return false
        }
    }
}
