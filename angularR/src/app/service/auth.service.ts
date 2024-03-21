import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

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

  loginUser(loginDetails: LoginDetails){
    this.http.post<any>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
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
}

// Du kom till 1 tim på API for inloggning registrering