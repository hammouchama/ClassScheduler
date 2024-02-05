import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);

    // Handle specific error statuses or types
    if (error.status === 400) {
      router.navigate(['/400']);
    } else if (error.status === 401) {
      router.navigate(['/401']);
    } else if (error.status === 404) {
      router.navigate(['/404']);
    } else if (error.status === 500) {
      router.navigate(['/500']);
    } else {
      // Handle other errors or navigate to a generic error page
      router.navigate(['/', error.status]);
    }

    console.error('Error caught by global error handler:', error);
  }
}
