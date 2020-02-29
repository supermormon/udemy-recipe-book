import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingrdient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    let newIngredient = new Ingredient(
      this.ingredientForm.value.name,
      this.ingredientForm.value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.ingredientForm.reset();
  }


}
