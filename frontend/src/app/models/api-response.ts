import { HttpResponse } from '@angular/common/http';

export class ApiResponse<T> extends HttpResponse<T> {
  public message: string | undefined;
  constructor(source: Partial<ApiResponse<T>> | null) {
    super();
    Object.assign(this, source);
  }
}
