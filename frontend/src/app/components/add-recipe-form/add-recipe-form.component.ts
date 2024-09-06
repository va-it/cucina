import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initialiseFormGroup();
  }

  private initialiseFormGroup(): void {
    this.recipeFormGroup = this.formBuilder.group({
      name: [ null, Validators.required ],
      time: [ null ],
      instructions: [ null, Validators.required ]
    });
  }
}
