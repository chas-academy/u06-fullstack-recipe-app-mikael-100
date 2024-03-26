import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterDetails } from '../interfaces/register-details';
import { AuthService } from '../service/auth.service';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


// FormGroup

form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl(''),
  password: new FormControl(''),
  password_confirmation: new FormControl('')
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
  this.auth.registerUser(this.form.value)
}



}
