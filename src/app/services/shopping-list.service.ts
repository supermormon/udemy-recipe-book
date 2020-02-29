import { Ingredient } from "../shared/ingrdient.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 3),
    new Ingredient('tomatoes', 5)
  ];

  notifyChange() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getShoppingList() {
    return this.ingredients.slice();
  }

  getIngredient(id: number): Ingredient {
    return this.ingredients[id];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.notifyChange();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.notifyChange();
  }

  updateIngredient(index: number, ingrdient: Ingredient) {
    this.ingredients[index] = ingrdient;
    this.notifyChange();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.notifyChange();
  }
}