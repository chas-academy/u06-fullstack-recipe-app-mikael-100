import { Component } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeCardSingle } from '../interfaces/recipe-card-single';

@Component({
  selector: 'app-recipe-card-single',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card-single.component.html',
  styleUrl: './recipe-card-single.component.css'
})
export class RecipeCardSingleComponent {
   id!: number;

    recipes: any[];

    recipeCardSingleInterface: RecipeCardSingle;

  constructor(private route: ActivatedRoute, private recipe: RecipeService) {
    this.recipes = []

    this.recipeCardSingleInterface = {
    title: "",
    image: "",
    summary: "",
    readyInMinutes: 0,
    };

    

  }



ngOnInit(): void {
  // Hämta id-parametern från den aktuella routen
  const idFranRecipeComponent = this.route.snapshot.paramMap.get('id');

  if (idFranRecipeComponent !== null) {
    // Logga id-parametern till konsolen
    console.log(idFranRecipeComponent);

    this.recipe.getRecipesInfo(idFranRecipeComponent).subscribe((resultatFranApi) => {
      console.log("Du klaraa det din nisse", resultatFranApi);

      // Skapa en array med resultatFranApi som enda element
      this.recipes = [resultatFranApi];
      console.log(this.recipes);
    });
  }
}





}


