import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredients.model";
import * as ShoppingListActions from "./shopping-list.actions";


const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Cucumber', 12)
    ]
};

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListActions.ShoppingListActions) 
    { 
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing, ingIndex) => {
                    return ingIndex !== action.payload;
                })
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.id]; //current
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient //coppied same obj ingredient
            };
            const updatedIngredients = [...state.ingredients]; //all ingredients
            updatedIngredients[action.payload.id] = updatedIngredient; //
            return {
                ...state,
                ingredients: updatedIngredients
            };
            //immutable logic
        default: 
            return state;
    }
}

