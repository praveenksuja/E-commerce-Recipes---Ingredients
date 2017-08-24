import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingServiceService} from './shopping-service.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements  OnInit, OnDestroy{
  ingredients: Ingredient[];
  subIngredientChange: Subscription;
  constructor(private shoppingService: ShoppingServiceService ) {}
  ngOnInit() {
    this.ingredients = this.shoppingService.getShoppingList();
    this.subIngredientChange = this.shoppingService.ingradientsChanged.subscribe(
      (ingredientChanged: Ingredient[]) => {
        this.ingredients = ingredientChanged;
      }
    );
  }
  onEdit(index: number) {
    this.shoppingService.editItem.next(index);
  }
  ngOnDestroy() {
    this.subIngredientChange.unsubscribe();
  }
}
