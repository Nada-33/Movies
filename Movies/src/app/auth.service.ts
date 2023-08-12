import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private Router: Router) {
    if(localStorage.getItem('userToken')!=null){
      this.setUserData();
    }//to keep user login with every refresh
   }

  register(userData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/auth/register', userData)
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/auth/login', userData)
  }

  setUserData(): void {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    console.log(decodedToken);
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.Router.navigate(['/login'])
  }
}
