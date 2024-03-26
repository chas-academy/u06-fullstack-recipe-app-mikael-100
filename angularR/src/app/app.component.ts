import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';
import { RegisterDetails } from './interfaces/register-details';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,RegisterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularR';

// Denna styr över Hamburgermenu och gör så att den triggar cssklassen hidden när den är false vilket betyder att den inte kommer att synas.
  menuValue: boolean = false;

openMenu(){
  this.menuValue = !this.menuValue;
  console.log('Menu value:', this.menuValue);
}



// auth service Login

loginDetails: LoginDetails;

user: User;

// Register

// registerDetails: RegisterDetails;

constructor(private auth: AuthService) {
  this.loginDetails = {
    email:"seb@seb.seb",
    password:"sebsebseb"
  }

  this.user = {
    id:-1,
    name:"",
    email:""
  }

  auth.loginUser(this.loginDetails);

  // Skapa register här under!

  // this.registerDetails = {
  //   name:"",
  //   email:"", 
  //   password:"", 
  //   password_cornfirmation:"",
    
  // }

}

getUser(){
  this.auth.getUser2().subscribe(res => {
    console.log(res[0]);
    this.user = res[0];

  })
}



// Register:
// Skapa en ny registerdetail variabel som använder interface variabel
// använd construktorn och gör test datan för variabeln.
// 

// register(){
//   this.auth.registerUser(this.registerDetails).subscribe((resultat: any) => {
//     console.log(resultat[0]);
//     this.user = resultat[0];
//   })
// }

// Logout

logout()  {
const token = localStorage.getItem('token');
    return this.auth.logoutUser(token);

  
}





}
