import { NgZone, inject, isDevMode } from "@angular/core";


declare global {
  interface Window {
    ngZone?: NgZone;
  }
}

/**
 * Make NgZone available in the global window scope.
 */
export const windowNgZoneFactory = () => {
  const zone = inject(NgZone);

  return () => {
    window.ngZone = zone;
  };
}

/**
 * Use single (parent) NgZone also for both the application and the element.
 * If the element is not using the same NgZone as the application, it will not be able to
 * trigger change detection in the application.
 */
export const ngZoneFactory: () => NgZone = () => {
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

