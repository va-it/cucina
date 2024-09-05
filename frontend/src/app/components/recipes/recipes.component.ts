import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'services/recipes/recipes.service';
import { Recipe } from 'models/recipe';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {

  public loading: boolean = true;
  public recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) {
  }

  public ngOnInit(): void {
    this.getAllRecipes();
  }

  private getAllRecipes(): void {
    this.recipesService.getAllRecipes().subscribe({
      next: (response: HttpResponse<Recipe[]>) => {
        if (response.ok) {
          response.body?.map((recipe: Recipe) => {
            this.recipes.push(new Recipe(recipe.id, recipe.name))
          });
        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response.error);
        this.loading = false;
      }, complete: () => {
        this.loading = false;
      }
    });
  }
}
