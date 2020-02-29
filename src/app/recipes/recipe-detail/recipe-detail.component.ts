import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(params['id']);
    });
  }

  onToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe);
    this.router.navigate(['/recipes']);
  }

}
