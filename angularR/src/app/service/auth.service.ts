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

private baseUrl = 'http://localhost:8000/api/';
  
private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  loginUser(loginDetails: LoginDetails){
    this.http.post<any>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        console.log(result.token);
        localStorage.setItem("token", result.token);
      })
    
  }


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

  // registerUser(registerDetails: RegisterDetails){
  //   this.http.post<any>(this.baseUrl+'register', registerDetails, this.httpOptions).pipe(
  //     catchError(this.handleError)).subscribe(result  => {
  //       console.log(result);
  //        console.log(result.token);
  //       localStorage.setItem("token", result.token);

  //     })
  // }

   // Register

  // registerUser(registerDetails: RegisterDetails){
  //   this.http.post<any>(this.baseUrl+'register', registerDetails, this.httpOptions).pipe(
  //     catchError(this.handleError)).subscribe((result: any)=> {
  //       console.log(result);
  //        console.log(result.token);
  //        return result;
  //     })
  // }

  // Register 4

// registerUser(registerDetails: RegisterDetails): Observable<any> {
//   return this.http.post<any>(this.baseUrl + 'register', registerDetails, this.httpOptions).pipe(
//     tap((result: any) => {
//       console.log(result);
//       console.log(result.token);
//     }),
//     catchError(this.handleError)
//   );
// }

// Register 5

  registerUser(registerDetails: RegisterDetails){
    this.http.post<any>(this.baseUrl+'register', registerDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(res  => {
        console.log(res);
         console.log(res.token);
        localStorage.setItem("token", res.token);

      })
    console.log("test")
    console.log(registerDetails)
  }


}


// Register 3

// import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

// registerUser(registerDetails: RegisterDetails): Observable<any> {
//   return this.http.post<any>(this.baseUrl + 'register', registerDetails, this.httpOptions).pipe(
//     map((result: any) => {
      // console.log(result);
      // console.log(result.token);
//       return result; // Returnera det omvandlade resultatet
//     }),
//     catchError(this.handleError)
//   );
// }


// Skapa en register funktion

// DU KOM TILL 08:27 på Ollie Auth, login registrering