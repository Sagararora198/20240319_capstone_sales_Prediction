import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class PredictionService {
    constructor(private http:HttpClient){
    }
    token = localStorage.getItem('Token')

    getprediction(title:string){
        return this.http.get(`http://localhost:5000/getPredictions?fileTitle=${title}`)


    }
    getcsvData(title:string){
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            Authorization:`Bearer ${this.token}`
        })
        return this.http.get(`http://localhost:3000/sale/myfile?title=${title}`,{headers})
    }
}
