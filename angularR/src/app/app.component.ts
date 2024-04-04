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


// Denna styr över Hamburgermenu och gör så att den triggar cssklassen hidden när den är false vilket betyder att den inte kommer att synas.
  menuValue: boolean = false;

openMenu(){
  this.menuValue = !this.menuValue;
  console.log('Menu value:', this.menuValue);
}



// auth service Login


user: User;

// 7. Gömma Länkar i Navbar och Hamburgermenu

arHenInloggad: boolean = false; 


// registerDetails: RegisterDetails;

constructor(private auth: AuthService, private recipe: RecipeService, private router: Router) {

  // this.name; "";

this.auth.inloggad.subscribe((inloggad: boolean) => {
  this.arHenInloggad = inloggad;
})


  this.user = {
    id:-1,
    name:"",
    email:""
  }

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


























