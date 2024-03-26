import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { RegisterDetails } from '../interfaces/register-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl = 'http://127.0.0.1:8000/api/';
  
private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  loginUser(loginDetails: Partial<LoginDetails>){
    this.http.post<any>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        console.log(result.token);
        localStorage.setItem("token", result.token);
      })
    
  }

  //   loginUser(loginForm: Partial<LoginDetails>){
  //   this.http.post<any>(this.baseUrl+'login', loginForm, this.httpOptions).pipe(
  //     catchError(this.handleError)).subscribe(result => {
  //       console.log(result);
  //       console.log(result.loginForm);
  //       localStorage.setItem("token", result.loginForm);
  //     })
    
  // }





getUser2(): Observable<User[]> {
  console.log(localStorage.getItem("token"));
  const token = localStorage.getItem("token") || ''; // Använd token om det finns, annars använd en tom sträng
  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + token);
  return this.http.get<User[]>(this.baseUrl+'getuser/2', this.httpOptions);
}


  private handleError(error: HttpErrorResponse){
    if (error.status === 0){
      console.error('An error occured:', error.error);
    } else {
      console.error(
        `backend returned code ${error.status}, body was: `, error.error
      );
    }
    return throwError(() => new Error('Something bad happened'));

  }

  // // Register


  
registerUser(form: any) {
  this.http.post<any>(this.baseUrl + 'register', form, this.httpOptions).pipe(
    catchError(this.handleError)
  ).subscribe(res => {
    console.log(res);
    console.log(res.token);
    localStorage.setItem("token", res.token);
  });
  
  console.log("test");
  console.log(form);
}




//  Logout User

logoutUser(token: String | null) {
  console.log("this is from logout " + token)
  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + token);
  this.http.post<any>(this.baseUrl + 'logout', this.httpOptions).pipe(
    catchError(this.handleError)
  ).subscribe(res => {
    console.log(res);
    console.log(res.token);
  })

}

}

