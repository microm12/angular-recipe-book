import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscr: Subscription;

  constructor(
    // private resService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscr = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    // this.recipes = this.resService.getRecipes();
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
