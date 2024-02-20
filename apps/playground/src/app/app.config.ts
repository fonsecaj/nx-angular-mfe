import { LazyElementsModule } from '@angular-extensions/elements';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, ENVIRONMENT_INITIALIZER, EnvironmentProviders, NgZone, provideZoneChangeDetection as _provideZoneChangeDetection, importProvidersFrom, inject, isDevMode, makeEnvironmentProviders } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withRouterConfig } from '@angular/router';
import { appRoutes } from './app.routes';

function provideZoneChangeDetection(): EnvironmentProviders {
  return makeEnvironmentProviders([
    _provideZoneChangeDetection(),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const zone = inject(NgZone);
        return () => {
          isDevMode() && console.warn('Make zone available on window for MFEs.');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).ngZone = zone;
        };
      }
    },
  ]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes,
      withRouterConfig({paramsInheritanceStrategy: 'always'}),  
    ),
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection(),
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
