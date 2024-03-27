import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LoginDetails } from '../interfaces/login-details';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


// Import av interface

loginDetails: LoginDetails;

// FormGroup

loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required]),
})


// // // Denna fungerar

  constructor(private auth: AuthService) { 
    this.loginDetails = {
      email:"",
      password:"",
    }
  }

  // Funktion som är bundet till Click som skickar FormGroup till AuthService

  login() {
    const loginDetails: Partial<LoginDetails> = {
        email: this.loginForm.value.email || '', // Om värdet är null eller undefined, använd en tom sträng istället
        password: this.loginForm.value.password || '' // Samma här
    };
    this.auth.loginUser(loginDetails);
}






// ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ

// Varför fungerar inte denna??????

// FormGroup

// loginForm = new FormGroup({
//   email: new FormControl<string>(''),
//   password: new FormControl<string>(''),
// })

// loginForm = new FormGroup<LoginDetails>({
//     email: new FormControl<string>(''),
//   password: new FormControl<string>(''),

// })
  

//  constructor(private auth: AuthService) { 
//     this.loginDetails = {
//       email:"",
//       password:"",
//     }
//   }



// login(){
//     this.auth.loginUser(this.loginForm.value)

//   }

}
