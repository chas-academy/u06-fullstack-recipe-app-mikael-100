import { Component } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { FormsModule } from '@angular/forms';
import { RecipeCard } from '../interfaces/recipe-card';
import { Filter } from '../interfaces/filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

   recipes: any[];

  // RecipeCard

recipeCard: RecipeCard;

  constructor (private recipe: RecipeService, private router: Router) {
    this.recipes = []

    
  // RecipeCard

  this.recipeCard = {
     id: 0,
  image: "",
  title: "", 
  }
  }

// Import av interface 

filter: Filter={
  query: "",
  mealtype: "",
  diet: "",
  allergenes: "",
}
// Denna är när du klickat i val och skrivit i namn på mat i searchbar

submitForm() {
  this.recipe.getRecipes(this.filter.query, this.filter.mealtype, this.filter.diet, this.filter.allergenes)
    .subscribe((resultatetFranApiAnropetSomJagSubscriberPa) => {
      console.log(resultatetFranApiAnropetSomJagSubscriberPa);
      
      this.recipes = resultatetFranApiAnropetSomJagSubscriberPa.results.map((item: any) => {
        return {
          id: item.id,
          image: item.image,
          title: item.title,
        }
      })
    });
}





// Denna är för att klicka in sig på ett specifikt recept

recipeCardSingle(id: number): void {
this.router.navigate(['recipe-card-single', { id: id }]);
}

}


