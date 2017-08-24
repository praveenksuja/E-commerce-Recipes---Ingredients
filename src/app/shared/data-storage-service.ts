import {RecipeServiceService} from '../recipes/recipe-service.service';
import {Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import 'rxjs/Rx';
@Injectable()
export  class DataStorageService {
  constructor(private  http: Http, private recipeService: RecipeServiceService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipelist();
    return this.http.put('https://recipe-book-ff01e.firebaseio.com/recipe.json', recipes);
  }
  getRecipes() {
    return this.http.get('https://recipe-book-ff01e.firebaseio.com/recipe.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if(!recipe['ingredient']) {
              console.log(recipe);
              recipe['ingredient'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipe(recipes);
        }
      );
  }
}
