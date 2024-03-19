import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';

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
user?: User;

constructor(private auth: AuthService) {
  this.loginDetails = {
    email:"seb@seb.se",
    password:"sebsebseb"
  }

  auth.loginUser(this.loginDetails);

}

getUser(){
  this.auth.getUser2().subscribe(res => {
    console.log(res[0]);
    this.user = res[0];

  })
}

}
