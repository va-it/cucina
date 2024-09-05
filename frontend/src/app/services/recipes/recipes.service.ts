import { Injectable } from '@angular/core';
import { ApiService } from 'services/api/api.service';
import { Recipe } from 'models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'models/api-response';

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends ApiService<Recipe>{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getRecipe(id: number): Observable<ApiResponse<Recipe>> {
    return this.getOne('recipes', id);
  }

  public getAllRecipes(): Observable<ApiResponse<Recipe[]>> {
    return this.getAll('recipes');
  }
}
