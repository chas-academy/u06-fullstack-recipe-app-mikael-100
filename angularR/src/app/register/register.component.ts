import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterDetails } from '../interfaces/register-details';
import { AuthService } from '../service/auth.service';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


// FormGroup Register

form = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
  password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
})

// Register  

registerDetails: RegisterDetails;

constructor(private auth: AuthService) {
  this.registerDetails = {
    name:"",
    email:"", 
    password:"", 
    password_confirmation:"",
    
  }

}





register(){
  this.registerDetails = {
    name: this.form.value.name || "",
    email: this.form.value.email || "",
    password: this.form.value.password || "",
    password_confirmation: this.form.value.password_confirmation || "",
    
  }
  this.auth.registerUser(this.registerDetails);
}


}
