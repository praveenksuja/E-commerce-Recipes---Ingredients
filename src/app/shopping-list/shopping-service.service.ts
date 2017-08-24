import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ShoppingServiceService {
  ingradientsChanged = new Subject<Ingredient[]>();
  editItem = new Subject<number>();
  ingredients: Ingredient[] = [new Ingredient ('Apple', 10),
    new Ingredient ('Tomato', 15),
    new Ingredient ('Capsicum', 8)];
  getShoppingList() {
    return this.ingredients.slice();
  }
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingradientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingreditn: Ingredient[]) {
    this.ingredients.push(... ingreditn);
    this.ingradientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingradientsChanged.next(this.ingredients.slice());

  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingradientsChanged.next(this.ingredients.slice());
  }
}
