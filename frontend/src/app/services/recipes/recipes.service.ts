import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../config';
import { Recipe } from 'models/recipe';
import { ApiResponse } from 'models/api-response';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  get httpClient(): HttpClient {
    return this._httpClient;
  }

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  public getRecipe(id: number): Observable<ApiResponse<Recipe>> {
    return this.httpClient.get<ApiResponse<Recipe>>(`${apiUrl}/recipes/${id}`);
  }

  public getAllRecipes(): Observable<ApiResponse<Recipe[]>> {
    return this.httpClient.get<ApiResponse<Recipe[]>>(`${apiUrl}/recipes`);
  }

  public deleteRecipe(id: number): Observable<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(`${apiUrl}/recipes/${id}`);
  }

  public deleteAllRecipes(): Observable<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(`${apiUrl}/recipes`);
  }

  public addRecipe(recipe: Recipe): Observable<ApiResponse<Recipe>> {
    const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<ApiResponse<Recipe>>(`${apiUrl}/recipes`, JSON.stringify(recipe), { headers: requestHeaders });
  }

  public editRecipe(recipe: Recipe): Observable<ApiResponse<Recipe>> {
    const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<ApiResponse<Recipe>>(`${apiUrl}/recipes/${recipe.id}`, JSON.stringify(recipe), { headers: requestHeaders });
  }
}
