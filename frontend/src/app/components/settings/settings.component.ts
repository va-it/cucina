import { Component } from '@angular/core';
import { RecipesService } from 'services/recipes/recipes.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(private recipesService: RecipesService) {
  }

  public deleteAllRecipes(): void {
    this.recipesService.deleteAllRecipes().subscribe({
      next: (response: HttpResponse<void>) => {
        if (response.ok) {

        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response);
      }
    });
  }
}
