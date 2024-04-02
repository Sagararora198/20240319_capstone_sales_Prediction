import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ResetPasswordService {
    constructor(private http:HttpClient){}
    reset(token:string,newpassword:string){
       return this.http.post(`http://localhost:3000/user/reset-password?token=${token}`,{newPassword:newpassword})
    }
}
