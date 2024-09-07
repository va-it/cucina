import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from 'services/recipes/recipes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Recipe } from 'models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit, OnDestroy {

  public id!: number;
  public loading: boolean = true;
  public recipe!: Recipe;
  private activatedRouteSubscription!: Subscription;

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id = +params['id'];
        this.getRecipe();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }

  public edit(): void {

  }

  public delete(): void {

  }

  private getRecipe(): void {
    this.loading = true;
    this.recipesService.getRecipe(this.id).subscribe({
      next: (response: HttpResponse<Recipe>) => {
        if (response.ok) {
          this.recipe = new Recipe(response.body);
        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response);
        this.loading = false;
      }, complete: () => {
        this.loading = false;
      }
    });
  }

}
