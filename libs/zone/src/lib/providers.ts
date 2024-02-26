
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, NgZone, provideZoneChangeDetection as _provideZoneChangeDetection, makeEnvironmentProviders } from '@angular/core';
import { ngZoneFactory, windowNgZoneFactory } from './ng-zone-factory';

export function providePlatformZoneChangeDetection(): EnvironmentProviders {
  return makeEnvironmentProviders([
    _provideZoneChangeDetection(),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: windowNgZoneFactory
    },
  ]);
}

export function provideMfeZoneChangeDetection(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: NgZone,
    useFactory: ngZoneFactory
  }]);
}
