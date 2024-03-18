import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { StartsidaComponent } from './startsida/startsida.component';
import { LoginComponent } from './login/login.component';
import { MinListaComponent } from './min-lista/min-lista.component';
import { LogoutComponent } from './logout/logout.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

export const routes: Routes = [
    {path: '', component: StartsidaComponent},
    {path: 'startsida', component: StartsidaComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'min-lista', component: MinListaComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'recipe-card', component: RecipeCardComponent}

];
