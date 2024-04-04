import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LoginDetails } from '../interfaces/login-details';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


// Import av interface

loginDetails: LoginDetails;

// FormGroup

loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.maxLength(30)]),
})


// // // Denna fungerar

  constructor(private auth: AuthService) { 
    this.loginDetails = {
      email:"",
      password:"",
    }
  }


login() {
    this.loginDetails = {
      email: this.loginForm.value.email || "",
      password: this.loginForm.value.password || "",
    }
    this.auth.loginUser(this.loginDetails);
  }


}
