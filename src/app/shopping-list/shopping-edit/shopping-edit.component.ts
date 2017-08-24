import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingServiceService} from '../shopping-service.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  index:number;
  @ViewChild('f') slForm: NgForm;
   constructor(private shoopingServ: ShoppingServiceService) {}
   ngOnInit() {
    this.subscription = this.shoopingServ.editItem.subscribe(
      (index:number) => {
        this.index = index;
        this.editedItem = this.shoopingServ.getIngredient(this.index);
        this.editMode = true;
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      }
    );
   }
  onSubmit(form: NgForm) {
      const value = form.value;
      const newIngredient = new Ingredient (value.name, value.amount);
      if (this.editMode) {
        this.shoopingServ.updateIngredient(this.index, newIngredient);
      } else {
        this.shoopingServ.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset();

    }
  onClear() {
     this.slForm.reset();
     this.editMode = false;
  }
  onDelete() {
     this.shoopingServ.deleteIngredient(this.index);
     this.onClear();
  }
    ngOnDestroy() {
     this.subscription.unsubscribe();
}
  }

