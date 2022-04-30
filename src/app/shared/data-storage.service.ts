import { Injectable } from "@angular/core"; 
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { exhaustMap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesServ: RecipeService,
        private authServ: AuthService ) { }
    
    storeRecipes() {
        const recipes = this.recipesServ.getRecipes();
        this.http.put('https://ng-recipes-project-1084b-default-rtdb.firebaseio.com/recipes.json',
         recipes).subscribe(resp => console.log(resp));
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
                'https://ng-recipes-project-1084b-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                    return {
                     ...recipe, 
                     ingreients: recipe.ingredients ? recipe.ingredients : []
                 }
                })
             }),
             tap(recipes => {
                 this.recipesServ.setRecipes(recipes);
                 console.log(recipes)
                })
            )
    }
}