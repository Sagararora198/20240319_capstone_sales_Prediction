import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient) { }

  token:string|null = localStorage.getItem('Token')
  getUser(){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      Authorization:`Bearer ${this.token}`
    })
    return this.http.get(`http://localhost:3000/user/user`,{headers:headers})
  }
}
