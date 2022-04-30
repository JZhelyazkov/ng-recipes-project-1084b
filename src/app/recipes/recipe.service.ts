import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable({providedIn: 'root'})
export class RecipeService {
    // selected: Recipe;
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Cake',
    //         'Tasty',
    //         'https://assets.epicurious.com/photos/5940644fe5fb577a90d32fe8/master/w_1280,c_limit/CALSSIC-YELLOW-CAKE-with-chocolate-frosting-09062017.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Fries', 10)
    //         ]),
    //     new Recipe(
    //         'Musaka',
    //          'Tasty', 
    //          'https://assets.epicurious.com/photos/5940644fe5fb577a90d32fe8/master/w_1280,c_limit/CALSSIC-YELLOW-CAKE-with-chocolate-frosting-09062017.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Fries', 10)
    //         ]
    //     ) 
    // ];
    private recipes: Recipe[] = [];
    constructor(private shoppingListService: ShoppingListService,
        private store: Store<{ shoppingListRed: { ingredients: Ingredient[] } }>) { }

    recipeSelected = new Subject<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        //this.shoppingListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    updateRecipe(id: number, recipe: Recipe) {
        this.recipes.splice(id, 1, recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}