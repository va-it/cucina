import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from 'services/recipes/recipes.service';
import { Recipe } from 'models/recipe';
import { Ingredient } from 'models/ingredient';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {

  public recipeFormGroup: FormGroup | undefined;
  @Input() recipe!: Recipe;
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
    this.recipesService.saveRecipe(this.recipe).subscribe({
      next: (response: HttpResponse<Recipe>) => {
        if (response.ok) {
          this.initialiseFormGroup();
          this.saved.emit();
        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response);
      }
    });
  }

  private initialiseFormGroup(): void {
    this.recipeFormGroup = this.formBuilder.group({
      name: [ this.recipe ? this.recipe.name : null, Validators.required ],
      ingredients: this.formBuilder.array([]),
      instructions: [ this.recipe ? this.recipe.instructions : null ]
    });
    this.initialiseIngredients();
  }

  private initialiseIngredients(): void {
    if (this.recipe && this.recipe.ingredients?.length) {
      this.recipe.ingredients?.forEach(ingredient => {
        this.ingredients.push(this.addIngredientControls(ingredient));
      });
    } else {
      this.ingredients.push(this.addIngredientControls());
    }
  }

  private addIngredientControls(ingredient?: Ingredient): FormGroup {
    return this.formBuilder.group({
      ingredientName: [ ingredient ? ingredient.name : null ],
      ingredientQuantity: [ ingredient ? ingredient.quantity : null ]
    })
  }

  private getValuesFromControls(): void {
    let ingredients: Ingredient[] = [];
    this.ingredients.controls.forEach(group => {
      if (group.get('ingredientName')?.value || group.get('ingredientQuantity')?.value) {
        let ingredient = new Ingredient({});
        ingredient.name = group.get('ingredientName')?.value;
        ingredient.quantity = group.get('ingredientQuantity')?.value;
        ingredients.push(ingredient);
      }
    });
    this.recipe = new Recipe(
      {
        name: this.name?.value,
        instructions: this.instructions?.value,
        ingredients: ingredients
      }
    );
  }
}
