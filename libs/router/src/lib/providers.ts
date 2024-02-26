import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { Router } from '@angular/router';
import { registerRouter } from './router-utils';
import { MfeLocationStrategy } from './mfe-location-strategy';

declare global {
  interface Window {
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