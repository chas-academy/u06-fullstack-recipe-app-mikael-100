import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterDetails } from '../interfaces/register-details';
import { AuthService } from '../service/auth.service';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


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
  this.auth.registerUser(this.registerDetails)
}



}
