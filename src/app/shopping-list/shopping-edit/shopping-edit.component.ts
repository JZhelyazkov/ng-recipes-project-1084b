import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from "../store/shopping-list.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store) { }
  subscription: Subscription;
  editMode = false;
  editemItemId: number;
  editedItem: Ingredient;
  elementToDelete = false;
  
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editemItemId = id;
        this.editedItem = this.shoppingListService.getIngredient(id);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  onSubmitItem(form: NgForm) {
    this.slForm = form;
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if(this.editMode) {
        this.shoppingListService.updateIngradient(this.editemItemId, newIngredient);
      } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      }  
      this.editMode = false; 
  }

  onClear() {
    this.slForm.setValue({
      name: "",
      amount: ""
      //can also be done with reset()(shortest way to do it)
    })
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editemItemId);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
