import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideToastr({
      positionClass: 'toast-center',
      preventDuplicates: true,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      timeOut: 3200,
      extendedTimeOut: 1200
    })
  ]
};