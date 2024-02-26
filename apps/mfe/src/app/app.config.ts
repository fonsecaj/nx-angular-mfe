import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideMfeLocationStrategy } from '@nx-angular-mfe/router';
import { provideMfeZoneChangeDetection } from '@nx-angular-mfe/zone';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes,
      withRouterConfig({paramsInheritanceStrategy: 'always'}),
    ),
    provideMfeLocationStrategy(),
    provideMfeZoneChangeDetection(),
    provideAnimations(),
    provideHttpClient(),
  ],
};
