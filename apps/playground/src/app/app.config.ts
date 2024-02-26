import { LazyElementsModule } from '@angular-extensions/elements';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withRouterConfig } from '@angular/router';
import { providePlatformLocationStrategy } from '@nx-angular-mfe/router';
import { providePlatformZoneChangeDetection } from '@nx-angular-mfe/zone';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes,
      withRouterConfig({paramsInheritanceStrategy: 'always', onSameUrlNavigation: 'reload'}),
    ),
    providePlatformLocationStrategy(),
    providePlatformZoneChangeDetection(),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      LazyElementsModule.forRoot({
        elementConfigs: [
          {
            tag: 'my-mfe-app',
            url: '/mfe/main.js',
          },
        ],
      })
    )
  ],
};
