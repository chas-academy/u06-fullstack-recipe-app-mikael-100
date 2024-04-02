import { Component } from '@angular/core';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-card-single',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card-single.component.html',
  styleUrl: './recipe-card-single.component.css'
})
export class RecipeCardSingleComponent {

  constructor(private recipe: RecipeService) {

  }




  


}
