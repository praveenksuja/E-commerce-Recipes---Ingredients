import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeServiceService} from '../recipe-service.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
// import {relative} from "path";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeservice: RecipeServiceService,
              private route: Router,
              private actRouter: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.recipeservice.recipesArray.subscribe(
      (recpies: Recipe[]) => {
        this.recipes = recpies;
      }
    );
    this.recipes = this.recipeservice.getRecipelist();
  }

  onNewRecipe() {
    this.route.navigate(['new'], {relativeTo: this.actRouter})
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

