import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class UploadDataService {
    token = localStorage.getItem('Token')
    constructor(private http:HttpClient){}
    uploadData(formData:any){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        })
        
       return this.http.post<any>(`http://localhost:3000/sale/upload`,formData,{headers:headers})
    }
}
