import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from 'services/recipes/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Recipe } from 'models/recipe';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit, OnDestroy, AfterViewInit {

  public id!: number;
  public loading: boolean = true;
  public recipe!: Recipe;
  private activatedRouteSubscription!: Subscription;
  private modal: Modal | undefined;
  @ViewChild('editRecipeModal') editRecipeModal: ElementRef | undefined;

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  public ngAfterViewInit(): void {
    this.modal = new Modal(this.editRecipeModal?.nativeElement, {backdrop: true});
  }

  public edit(): void {
    this.openModal();
  }

  public delete(): void {
    this.recipesService.deleteRecipe(this.id).subscribe({
      next: (response: HttpResponse<void>) => {
        if (response.ok) {
          this.goToRecipes();
        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response);
      }
    });
  }

  public openModal(): void {
    if (this.modal) {
      this.modal.show();
    }
  }

  public closeModal(): void {
    if (this.modal) {
      this.modal.hide();
    }
  }

  public reloadRecipe(): void {
    this.closeModal();
    this.getRecipe();
  }

  public getRecipe(): void {
    this.loading = true;
    this.recipesService.getRecipe(this.id).subscribe({
      next: (response: HttpResponse<Recipe>) => {
        if (response.ok) {
          this.recipe = new Recipe(response.body);
        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response);
        this.goToRecipes();
        this.loading = false;
      }, complete: () => {
        this.loading = false;
      }
    });
  }

  private goToRecipes(): void {
    this.router.navigate([ `recipes` ]).then(() => {
    }, (reason) => {
      console.error(reason)
    });
  }
}
