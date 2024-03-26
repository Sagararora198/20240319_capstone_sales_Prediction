import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoginService {
    constructor(private http:HttpClient){
        this.checkloginStatus()
    }
    login(userdata:{email:String,password:String}){
       return this.http.post(`http://localhost:3000/user/login`,userdata)
    }


    private loggedIn = new BehaviorSubject<boolean>(false)
    loggedIn$ = this.loggedIn.asObservable()
    setLogin(token:string,userId:string){
        localStorage.setItem('Token',token)
        localStorage.setItem('userId',userId)
        this.loggedIn.next(true)
        

    }
    private checkloginStatus(){
        const token = localStorage.getItem('Token');
        // If token exists, user is considered logged in
        if (token) {
            this.loggedIn.next(true);
        } else {
            this.loggedIn.next(false);
        }
    }
    setLogout(){
        this.loggedIn.next(false)
        localStorage.removeItem('Token')
        localStorage.removeItem('userId')
    }
    autoLogout(expirationDate:number){
        setTimeout(()=>{
            this.setLogout()
        },expirationDate)

    }
}

