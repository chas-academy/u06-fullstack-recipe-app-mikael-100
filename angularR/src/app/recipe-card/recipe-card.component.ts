import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeCard } from '../interfaces/recipe-card';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  recipes: any[];
  recipeCard: RecipeCard;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipes = [];
    this.recipeCard = {
      id: 0,
      image: "",
      title: ""
    };
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.recipes = history.state.recipes.results.map((item: any) => {
        return {
          id: item.id,
          image: item.image,
          title: item.title,
        }
      })
      console.log("Jarå")
      console.log(this.recipes);

      
    });
  }

// getRecipesAndSubscribe(query: string, mealtype: string, diet: string, allergenes: string): void {
//   this.recipeService.getRecipes(query, mealtype, diet, allergenes)
//     .subscribe((resultatetFranApiAnropetSomJagSubscriberPa) => {
//       // Här kan du utföra åtgärder med resultatet från API-anropet
//       console.log("Resultat från API-anropet:", resultatetFranApiAnropetSomJagSubscriberPa);

//       this.recipes = resultatetFranApiAnropetSomJagSubscriberPa.results.map((item: any) => {
//         return {
//           id: item.id,
//           image: item.image,
//           title: item.title
//         };
//       });
//     });
// }




  recipeCardSingle(id: number): void {
    this.recipeService.getRecipesInfo(id.toString()).subscribe(resultatFranAPI => {
      console.log(resultatFranAPI);
      this.router.navigate(['recipe-card-single', { id: id }]);
    });
  }

  
}
