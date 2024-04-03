import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';
import { RegisterDetails } from './interfaces/register-details';
import { FormsModule, NgModel } from '@angular/forms';
import { RecipeService } from './service/recipe.service';
import { Filter } from './interfaces/filter';
import { RecipeCard } from './interfaces/recipe-card';
import { Recipe } from './interfaces/recipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,RegisterComponent, CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularR';

  // recipes: any[];

// Denna styr över Hamburgermenu och gör så att den triggar cssklassen hidden när den är false vilket betyder att den inte kommer att synas.
  menuValue: boolean = false;

openMenu(){
  this.menuValue = !this.menuValue;
  console.log('Menu value:', this.menuValue);
}



// auth service Login

loginDetails: LoginDetails;

user: User;

// 7. Gömma Länkar i Navbar och Hamburgermenu

arHenInloggad: boolean = false; 


// registerDetails: RegisterDetails;

constructor(private auth: AuthService, private recipe: RecipeService, private router: Router) {

this.auth.inloggad.subscribe((inloggad: boolean) => {
  this.arHenInloggad = inloggad;
})

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


 


}







getUser(){
  this.auth.getUser2().subscribe(res => {
    console.log(res[0]);
    this.user = res[0];

  })
}

// Logout

logout()  {
    return this.auth.logoutUser();
}



}






























  // Skapa register här under!

  // this.registerDetails = {
  //   name:"",
  //   email:"", 
  //   password:"", 
  //   password_cornfirmation:"",
    
  // }


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