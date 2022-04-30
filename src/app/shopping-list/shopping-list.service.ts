import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    startEditing = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Cucumber', 12)
      ];

    constructor(private store: Store) { }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(id: number) {
        return this.ingredients[id];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngradient(id: number, newIngredient: Ingredient) {
        this.ingredients[id] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(id: number) {
        // this.ingredients.splice(id, 1);
        // this.ingredientsChanged.next(this.ingredients.slice())
        this.store.dispatch(new ShoppingListActions.DeleteIngredient(id));
    }
    
}