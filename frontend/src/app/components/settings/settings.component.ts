import { Component } from '@angular/core';
import { RecipesService } from 'services/recipes/recipes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'models/api-response';
import { ApiResponseService } from 'services/api-response/api-response.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(
    private recipesService: RecipesService,
    private apiResponseService: ApiResponseService
  ) {
  }

  public deleteAllRecipes(): void {
    this.recipesService.deleteAllRecipes().subscribe({
      next: (response: ApiResponse<void>) => {
        if (response.ok) {
          this.apiResponseService.displayMessage(response);
        }
      }, error: (response: HttpErrorResponse) => {
        console.error(response);
      }
    });
  }
}
