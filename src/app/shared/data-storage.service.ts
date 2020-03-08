import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseUrl = 'https://angular-backend-5ee88.firebaseio.com/';

  constructor(private http: HttpClient,
    private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      this.baseUrl + 'recipes.json',
      recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.baseUrl + "recipes.json")
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            let newRecipe: Recipe = {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : recipe.ingredients = [] }
            return newRecipe;
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

}
