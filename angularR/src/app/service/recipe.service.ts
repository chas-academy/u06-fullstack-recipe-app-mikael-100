import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    // private baseUrl = 'https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=ed85c714123840378a2b67607583fb44';

    // private baseUrl2 = 'https://api.spoonacular.com/recipes/637876/information?apiKey=ed85c714123840378a2b67607583fb44';


  private baseUrl2 = 'https://api.spoonacular.com/recipes';

  private baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private app_key = "ed85c714123840378a2b67607583fb44";
  
  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })

  }

  private recipesSubject = new BehaviorSubject<any[]>([]);
  recipes$ = this.recipesSubject.asObservable();


  constructor(private http:HttpClient)  { }

setRecipes(recipes: any[]): void {
    this.recipesSubject.next(recipes);
  }


// Sökning efter recept från Searchbar

      getRecipes(query: string, mealtype: string, diet: string, allergenes: string): Observable<any> {
      let url = `${this.baseUrl}?query=${query}&mealtype=${mealtype}&diet=${diet}&mallergenes=${allergenes}&apiKey=${this.app_key}`;
      console.log(url);
       return this.http.get<any>(url, this.httpOptions);
       
}


// Sökning efter ID för att kunna visa enskillt recept

getRecipesInfo(id: string): Observable<any> {
  let url = `${this.baseUrl2}/${id}/information?apiKey=${this.app_key}`
  return this.http.get<any>(url, this.httpOptions);
  
}







} 



