import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeServiceService} from "../recipes/recipe-service.service";
import {DataStorageService} from "../shared/data-storage-service";
import  {Response} from '@angular/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
constructor(private dataStorageService: DataStorageService){}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }
  onFetchData(){
  this.dataStorageService.getRecipes();

  }
}
