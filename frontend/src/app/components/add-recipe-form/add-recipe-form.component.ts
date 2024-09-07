import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from 'services/recipes/recipes.service';
import { Recipe } from 'models/recipe';
import { Ingredient } from 'models/ingredient';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrl: './add-recipe-form.component.scss'
})
export class AddRecipeFormComponent implements OnInit {

  public recipeFormGroup: FormGroup | undefined;
  private recipeToSave!: Recipe;
  @Output() saved: EventEmitter<void> = new EventEmitter<void>();

  get name(): AbstractControl | null | undefined {
    return this.recipeFormGroup?.get('name');
  }

  get instructions(): AbstractControl | null | undefined {
    return this.recipeFormGroup?.get('instructions');
  }

  get ingredients(): FormArray {
    return this.recipeFormGroup?.get('ingredients') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private recipesService: RecipesService
  ) {
  }

  public ngOnInit(): void {
    this.initialiseFormGroup();
  }

  public addIngredient(): void {
    this.ingredients.push(this.addIngredientControls());
  }

  public removeIngredient(index: number): void {
    this.ingredients.controls.splice(index, 1);
  }

  public save(): void {
    this.getValuesFromControls();
    this.recipesService.saveRecipe(this.recipeToSave).subscribe({
      next: (response: HttpResponse<Recipe>) => {
        if (response.ok) {
          this.saved.emit();
        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response);
      }
    });
  }

  private initialiseFormGroup(): void {
    this.recipeFormGroup = this.formBuilder.group({
      name: [ null, Validators.required ],
      ingredients: this.formBuilder.array([
        this.addIngredientControls()
      ]),
      instructions: [ null ]
    });
  }

  private addIngredientControls(): FormGroup {
    return this.formBuilder.group({
      ingredientName: [ null ],
      ingredientQuantity: [ null ]
    })
  }

  private getValuesFromControls(): void {
    let ingredients: Ingredient[] = [];
    this.ingredients.controls.forEach(group => {
      let ingredient = new Ingredient({});
      ingredient.name = group.get('ingredientName')?.value;
      ingredient.quantity = group.get('ingredientQuantity')?.value;
      ingredients.push(ingredient);
    });
    this.recipeToSave = new Recipe(
      {
        name: this.name?.value,
        instructions: this.instructions?.value,
        ingredients: ingredients
      }
    );
  }
}
