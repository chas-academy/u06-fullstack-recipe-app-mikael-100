import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    // private baseUrl = 'https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=ed85c714123840378a2b67607583fb44';

  private baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private app_key = "ed85c714123840378a2b67607583fb44";
  
  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })

  }

  constructor(private http:HttpClient)  { }



//       getRecipes(searchTerm: string): Observable<any[]> {
//       let url = `${this.baseUrl}?query=${searchTerm}&apiKey=${this.app_key}`;
//        return this.http.get<any[]>(url, this.httpOptions);
// }

      getRecipes(query: string, mealtype: string, diet: string, allergenes: string): Observable<any[]> {
      let url = `${this.baseUrl}?query=${query}&mealtype=${mealtype}&diet=${diet}&mallergenes=${allergenes}&apiKey=${this.app_key}`;
       return this.http.get<any[]>(url, this.httpOptions);
}






} 



