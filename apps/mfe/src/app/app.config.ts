import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, EnvironmentProviders, NgZone, isDevMode, makeEnvironmentProviders } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

function provideZoneChangeDetection(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: NgZone,
    useFactory: ngZoneFactory
  }]);
}

/**
 * Use single (parent) NgZone also for both the application and the element.
 * If the element is not using the same NgZone as the application, it will not be able to
 * trigger change detection in the application.
 */
const ngZoneFactory: () => NgZone = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parentZone = (window as any).ngZone;

  if (parentZone) {
    isDevMode() && console.warn('Using existing parent zone for change detection.');

    return parentZone;
  }

  isDevMode() && console.warn('Parent zone not found, creating a new zone for change detection.');

  return new NgZone({
    enableLongStackTrace: false,
    shouldCoalesceEventChangeDetection: false,
    shouldCoalesceRunChangeDetection: false,
  })
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection()
  ],
};
