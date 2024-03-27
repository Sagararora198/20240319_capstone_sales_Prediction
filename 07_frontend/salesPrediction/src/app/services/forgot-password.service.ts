import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ForgotPasswordService {
    constructor(private http:HttpClient){}
    forgotPassword(userData:{email:string}){
        return this.http.post(`http://localhost:3000/user/forgot-password`,userData)
    }
}
