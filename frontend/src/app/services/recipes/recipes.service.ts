import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../config';
import { Recipe } from 'models/recipe';

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

  public getRecipe(id: number): Observable<HttpResponse<Recipe>> {
    return this.httpClient.get<HttpResponse<Recipe>>(`${apiUrl}/recipes/${id}`);
  }

  public getAllRecipes(): Observable<HttpResponse<Recipe[]>> {
    return this.httpClient.get<HttpResponse<Recipe[]>>(`${apiUrl}/recipes`);
  }

  public deleteAllRecipes(): Observable<HttpResponse<void>> {
    return this.httpClient.delete<HttpResponse<void>>(`${apiUrl}/recipes`);
  }

  public saveRecipe(recipe: Recipe): Observable<HttpResponse<Recipe>> {
    const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<HttpResponse<Recipe>>(`${apiUrl}/recipes`, JSON.stringify(recipe), { headers: requestHeaders });
  }
}
