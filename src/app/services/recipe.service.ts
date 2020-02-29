import { Recipe } from "../recipes/recipe.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingrdient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      '0',
      'Pancakes',
      'Super fluffy pancakes for you and your family. "5/5 stars!" - Anonymous',
      'https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Fluffy-Pancakes-New-CMS.jpg',
      [
        new Ingredient('flour', 2),
        new Ingredient('eggs', 2),
        new Ingredient('maple syrup', 1)
      ]),
    new Recipe(
      '1',
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

  getNextId() {
    if (this.recipes.length > 0) {
      return (+this.recipes[this.recipes.length - 1].id + 1).toString();
    } else {
      return '0';
    }
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    return this.recipes.find((recipe: Recipe) => {
      return recipe.id === id;
    });
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.getNextId();
    this.recipes.push(recipe);
    this.notifyChange();
  }

  updateRecipe(index: string, newRecipe: Recipe) {
    newRecipe.id = this.recipes[index].id;
    this.recipes[index] = newRecipe;
    this.notifyChange();
  }

  deleteRecipe(recipe: Recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);
    this.notifyChange();
  }

  private notifyChange() {
    this.recipesChanged.next(this.recipes.slice());
  }
}