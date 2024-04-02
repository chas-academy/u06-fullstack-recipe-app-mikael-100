import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeCard } from '../interfaces/recipe-card';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
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
      this.recipes = history.state.recipes;
      console.log("Jarå")
      console.log(this.recipes);
    });
  }

  recipeCardSingle(id: number): void {
    this.recipeService.getRecipesInfo(id.toString()).subscribe(resultatFranAPI => {
      console.log(resultatFranAPI);
      this.router.navigate(['recipe-card-single', { id: id }]);
    });
  }

  
}
