import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from 'services/recipes/recipes.service';
import { Recipe } from 'models/recipe';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Modal } from 'bootstrap';

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

  constructor(private recipesService: RecipesService) {
  }

  public ngOnInit(): void {
    this.getAllRecipes();
  }

  public ngAfterViewInit(): void {
    this.modal = new Modal(this.addRecipeModal?.nativeElement, { backdrop: true });
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

  private getAllRecipes(): void {
    this.recipes = [];
    this.recipesService.getAllRecipes().subscribe({
      next: (response: HttpResponse<Recipe[]>) => {
        if (response.ok) {
          response.body?.map((recipe: Recipe) => {
            this.recipes.push(new Recipe(recipe));
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
