import {ActivatedRoute, Params, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeServiceService} from '../recipe-service.service';
import {ShoppingServiceService} from "../../shopping-list/shopping-service.service";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  ingredient: Ingredient[];
  constructor(private recipeService: RecipeServiceService,
              private router: ActivatedRoute,
              private  route: Router,
              ) {
  }

  ngOnInit() {
    this.router.params.
    subscribe(
    (params: Params) => {
        this.id = params['id'];
      this.recipe = this.recipeService.getRecipeId(this.id);
    });
  }
  onEditRecipe() {
    this.route.navigate(['edit'], {relativeTo: this.router});
    // this.route.navigate(['../', 'this.id', 'edit'], {relativeTo: this.router});
  }
  toShoppingList() {
    this.ingredient = this.recipe.ingredient;
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredient);
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.route.navigate(['/recipes']);
  }

}
