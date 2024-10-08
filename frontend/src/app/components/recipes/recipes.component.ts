import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from 'services/recipes/recipes.service';
import { Recipe } from 'models/recipe';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { ApiResponse } from 'models/api-response';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit, AfterViewInit {

  public loading: boolean = true;
  public recipes: Recipe[] = [];
  private modal: Modal | undefined;
  @ViewChild('addRecipeModal') addRecipeModal: ElementRef | undefined;

  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.getAllRecipes();
  }

  public ngAfterViewInit(): void {
    this.modal = new Modal(this.addRecipeModal?.nativeElement, {backdrop: true});
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

  public reloadRecipes(): void {
    this.closeModal();
    this.getAllRecipes();
  }

  public viewRecipe(id: number | undefined): void {
    if (id) {
      this.router.navigate([ `recipes/${id}` ]).then(() => {
      }, (reason) => {
        console.error(reason)
      });
    }
  }

  private getAllRecipes(): void {
    this.recipes = [];
    this.recipesService.getAllRecipes().subscribe({
      next: (response: ApiResponse<Recipe[]>) => {
        if (response.ok) {
          response.body?.forEach((recipe: Recipe) => {
            this.recipes.push(new Recipe(recipe));
          });
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
