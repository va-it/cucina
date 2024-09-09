import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast } from 'bootstrap';
import { ApiResponseService } from 'services/api-response/api-response.service';
import { ApiResponse } from 'models/api-response';

@Component({
  selector: 'app-api-response',
  templateUrl: './api-response.component.html',
  styleUrl: './api-response.component.scss'
})
export class ApiResponseComponent implements OnInit, OnDestroy {
  public messages: ApiResponse<any>[] = [];
  private apiResponseSubscription!: Subscription;
  @ViewChildren('toasts') toasts!:  QueryList<ElementRef<HTMLElement>>;

  constructor(
    private apiResponseService: ApiResponseService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.apiResponseSubscription = this.apiResponseService.newMessageObservable.subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        if (apiResponse) {
          this.removeHiddenToastsAndAssociatedMessages();
          this.messages.push(apiResponse);
          this.changeDetectorRef.detectChanges();
          this.toasts.forEach((toast: ElementRef<HTMLElement>, index: number) => {
            if (index === (this.messages.length - 1)) {
              let autoHide: boolean | undefined = apiResponse.ok;
              const toastBootstrap: Toast = new Toast(toast.nativeElement, { autohide: autoHide, delay: 5000 });
              toastBootstrap.show();
            }
          });
        }
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.apiResponseSubscription) {
      this.apiResponseSubscription.unsubscribe();
    }
  }

  public removeMessage(index: number): void {
    this.messages.splice(index, 1);
  }

  private removeHiddenToastsAndAssociatedMessages(): void {
    for (let i: number = this.messages.length - 1; i >= 0; i--) {
      const toastBootstrap: Toast | null = Toast.getInstance(this.toasts.get(i)!.nativeElement);
      if (toastBootstrap && !toastBootstrap.isShown()) {
        this.removeMessage(i);
        this.toasts.get(i)!.nativeElement.remove();
      }
    }
  }
}
