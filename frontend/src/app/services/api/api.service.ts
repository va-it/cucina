import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from '../../config';
import { Observable } from 'rxjs';
import { ApiResponse } from 'models/api-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  get http(): HttpClient {
    return this._http;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  protected constructor(
    public _http: HttpClient,
    public _apiUrl: string = apiBaseUrl
  ) {}

  getOne(endpoint: string, id: number): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  getAll(endpoint: string): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(`${this.apiUrl}/${endpoint}`);
  }
}
