import { Recipe } from "../recipes/recipe.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingrdient.model";

@Injectable({
   providedIn: 'root'
})
export class RecipeService {
   recipeSelected = new EventEmitter<Recipe>();

   private recipes: Recipe[] = [
      new Recipe(
         'Pancakes',
         'Super fluffy pancakes for you and your family. "5/5 stars!" - Anonymous',
         'https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Fluffy-Pancakes-New-CMS.jpg', 
         [
            new Ingredient('flour', 2),
            new Ingredient('eggs', 2),
            new Ingredient('maple syrup', 1)
         ]),
      new Recipe(
         'Best Burger', 
         'Holy cow this burger is great.  Disclaimer: not made from a holy cow', 
         'https://d9hyo6bif16lx.cloudfront.net/live/img/production/detail/menu/lunch-dinner_burgers_all-american-burger.jpg', 
         [
            new Ingredient('beef', 2),
            new Ingredient('tomato', 1),
            new Ingredient('lettuce', 1),
            new Ingredient('hamburger buns', 8),
         ])
   ];

   getRecipes() {
      return this.recipes.slice();
   }
}