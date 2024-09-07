import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrl: './add-recipe-form.component.scss'
})
export class AddRecipeFormComponent implements OnInit {

  public recipeFormGroup: FormGroup | undefined;

  get name(): AbstractControl | null | undefined {
    return this.recipeFormGroup?.get('name');
  }

  get ingredients(): FormArray {
    return this.recipeFormGroup?.get('ingredients') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
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
}
