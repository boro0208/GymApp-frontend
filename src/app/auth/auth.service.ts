import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private loggedIn: boolean = true;
  private userEmail!: string;

  get isLoggedIn() {
    // return this.loggedIn;
    return this.loggedIn.asObservable();
  }
  constructor(
    private router: Router,
    private http : HttpClient
  ) {
    if(localStorage.getItem('access_token') == null){
      this.loggedIn.next(false);
    }
  }

  login(user: User) {
    if (user.email !== '' && user.password !== '' ) {
      
      this.loggedIn.next(true);

      let body = new URLSearchParams();
      body.set('email', user.email);
      body.set('password', user.password);

      let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };

      this.http.post<any>("http://localhost:8080/login", 
        body.toString(), options)
        .subscribe((response: any) => {
          localStorage.setItem('access_token', response["access_token"]);
          localStorage.setItem('refresh_token', response["refresh_token"]);
          this.router.navigate(['/']);
      },
      error => {
        Swal.fire(
          'Wrong username or password.',
          '',
          'error'
        )
    });
    }   
  }

  getLoggedInUser(authToken: any) {
    let options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`),
      params: new HttpParams()
        .set('email', this.userEmail)
    };
    return this.http.get("http://localhost:8080/api/v1/users/email",
     options).subscribe((response) =>{
      response
    })
  }


  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
