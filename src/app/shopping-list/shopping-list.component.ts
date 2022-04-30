import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private idChange: Subscription;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingListRed: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingListRed');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.idChange = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // )
  }

  ngOnDestroy(): void {
    // this.idChange.unsubscribe();
  }

  onItemEdit(id: number) {
    this.shoppingListService.startEditing.next(id);
  }

}
