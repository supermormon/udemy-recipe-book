import { Ingredient } from "../shared/ingrdient.model";
import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
   providedIn: 'root'
})
export class ShoppingListService {
   ingredientsChanged = new EventEmitter<Ingredient[]>();

   private ingredients: Ingredient[] = [
      new Ingredient('apples', 3),
      new Ingredient('tomatoes', 5)
   ];

   getShoppingList() {
      return this.ingredients.slice();
   }

   addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.emit(this.ingredients.slice());
   }
   
   addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.emit(this.ingredients.slice());
   }

   deleteIngredient() {

   }
}