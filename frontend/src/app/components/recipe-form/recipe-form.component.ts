import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from 'services/recipes/recipes.service';
import { Recipe } from 'models/recipe';
import { Ingredient } from 'models/ingredient';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {

  public recipeFormGroup: FormGroup | undefined;
  private observable!: Observable<HttpResponse<Recipe>>;
  @Input() recipe!: Recipe;
  @Output() saved: EventEmitter<void> = new EventEmitter<void>();

  get name(): AbstractControl | null | undefined {
    return this.recipeFormGroup?.get('name');
  }

  get servings(): AbstractControl | null | undefined {
    return this.recipeFormGroup?.get('servings');
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
    this.recipeFormGroup?.markAsDirty();
  }

  public removeIngredient(index: number): void {
    this.ingredients.controls.splice(index, 1);
    this.recipeFormGroup?.markAsDirty();
  }

  public save(): void {
    this.getValuesFromControls();
    if (this.recipe.id) {
      this.observable = this.recipesService.editRecipe(this.recipe);
    } else {
      this.observable = this.recipesService.addRecipe(this.recipe);
    }
    this.observable.subscribe({
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

  public undoChanges(): void {
    this.initialiseFormGroup();
  }

  private initialiseFormGroup(): void {
    this.recipeFormGroup = this.formBuilder.group({
      name: [ this.recipe ? this.recipe.name : null, Validators.required ],
      servings: [ this.recipe ? this.recipe.servings : null, Validators.pattern('[0-9]*') ],
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
        id: this.recipe ? this.recipe.id : undefined,
        name: this.name?.value,
        servings: this.servings?.value,
        instructions: this.instructions?.value,
        ingredients: ingredients
      }
    );
  }
}
