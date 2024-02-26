import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { Router } from '@angular/router';
import { registerRouter } from './router-utils';
import { MfeLocationStrategy } from './mfe-location-strategy';

declare global {
  interface Window {
    /**
     *
     * Retrieve all event listeners by name.
     *
     * This method is optional because it may not be available if you use `noop zone` when
     * bootstrapping Angular application or disable the `EventTarget` monkey patch by `zone.js`.
     *
     * If the `eventName` is provided, will return an array of event handlers or event listener
     * objects of the given event.
     * If the `eventName` is not provided, will return all listeners.
     *
     * @param router the name of the event, such as click.
     */
    registerRouter?(router?: Router): {
      unregister: () => void;
    };
  }
}

export function providePlatformLocationStrategy(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const router = inject(Router);

        return () => {
          registerRouter(router);
          window.registerRouter = registerRouter;
        };
      }
    },
  ]);
}

export function provideMfeLocationStrategy(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: LocationStrategy, useClass: MfeLocationStrategy },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const router = inject(Router);

        return () => {
          window.registerRouter?.(router);
        };
      }
    },
  ]);
}