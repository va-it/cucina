import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from 'models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  // Observable source
  private newMessageSubject: Subject<ApiResponse<any>> = new Subject<ApiResponse<any>>();

  // Observable stream
  public newMessageObservable: Observable<ApiResponse<any>> = this.newMessageSubject.asObservable();

  constructor() {
  }

  public displayMessage(message: ApiResponse<any>): void {
    this.newMessageSubject.next(message);
  }
}
