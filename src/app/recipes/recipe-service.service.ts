import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingServiceService} from '../shopping-list/shopping-service.service';
import {Subject} from "rxjs/Subject";

@Injectable()
export class RecipeServiceService implements  OnInit{
  recipesArray =  new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe ('Fisrt Recipe', 'hot chilli',
      'http://www.seriouseats.com/recipes/assets_c/2017/03/Stir_Fried_Lo_Mein_20170315_3-edit-thumb-1500xauto-436988.jpg',
    [new Ingredient ('Meat', 1),
      new Ingredient ('French fries', 20)
    ]),
    new Recipe ('Second Recipe', 'Spicy Chicken',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
    [new Ingredient ('Meat', 3),
      new Ingredient ('Bun', 2)])
  ];
  constructor(private shoppinService: ShoppingServiceService) {}
  ngOnInit() {
  }
  getRecipelist() {
   return this.recipes.slice();
  }
  getRecipeId(indexer: number) {
   return  this.recipes[indexer];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppinService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesArray.next(this.recipes.slice());
  }
  updateRecipe(index:number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesArray.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesArray.next(this.recipes.slice());
  }
  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesArray.next(this.recipes.slice());
  }

}
