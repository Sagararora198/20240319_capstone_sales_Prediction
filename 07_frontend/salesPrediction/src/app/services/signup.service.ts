import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class SignupService {
    constructor(private http:HttpClient){}
    signup(userData:{email:String,password:String}){
        return this.http.post(`http://localhost:3000/user/signup`,userData)
    }
}
