import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'ssshttps://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=ed85c714123840378a2b67607583fb44'
  

  private httpOptions = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  }

  constructor() { }
}
