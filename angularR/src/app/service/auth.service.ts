import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { RegisterDetails } from '../interfaces/register-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


// Logged in som kollar on vaiabel är true eller false som skickas till auth

inloggad = new BehaviorSubject<boolean>(false);

hamtaInloggningsstatusSomObserveble(){
  return this.inloggad.asObservable();
}

andraInloggningsStatus(value: boolean) {
  return this.inloggad.next(value);
}


// Detta är webbadressen som skickar get och post till api

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
        this.andraInloggningsStatus(true);
        console.log(this.andraInloggningsStatus)
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

// getUser2(): Observable<User[]> {
//   console.log(localStorage.getItem("token"));
//   const token = localStorage.getItem("token") || ''; // Använd token om det finns, annars använd en tom sträng
//   this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + token);
//   return this.http.get<User[]>(this.baseUrl+'getuser/2', this.httpOptions);
// }


//  Logout User

logoutUser() {
  console.log(localStorage.getItem("token"))
  const token = localStorage.getItem("token") || '';
  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + token);
  this.http.post<any>(this.baseUrl + 'logout', {}, this.httpOptions).pipe(
    catchError(this.handleError)
  ).subscribe(res => {
    console.log(res);
    console.log(res.token);
    this.andraInloggningsStatus(false);
    console.log(this.andraInloggningsStatus)
  })

}

}

