import { APP_BASE_HREF, DOCUMENT, LocationChangeListener, LocationStrategy } from '@angular/common';
import { EventEmitter, Inject, Injectable, OnDestroy, Optional, inject } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MfeLocationStrategy extends LocationStrategy implements OnDestroy {
  _baseHref = '/';

  _path = '/'

  _title = '';

  _urlChanges: string[] = [];

  _location$ = new EventEmitter<LocationChangeEvent>();
  
  _stateChanges: LocationState[] = [];

  _sub = new Subscription();

  constructor(
    @Optional() @Inject(APP_BASE_HREF) baseHref?: string,
  ) {
    super();

    this._baseHref =
      baseHref ??
      inject(DOCUMENT).location.origin ??
      '/';

    const href = inject(DOCUMENT).location.href;
    
    this._path = href.substring(href.indexOf(this._baseHref) + this._baseHref.length);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  triggerPopState(url: string): void {
    this._path = url;
    this._location$.emit(new LocationChangeEvent(this.path()));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override path(_ = false): string {
    return this._path;
  }

  override prepareExternalUrl(internal: string): string {
    if (internal.startsWith('/') && this._baseHref.endsWith('/')) {
      return this._baseHref + internal.substring(1);
    }
  
    return this._baseHref + internal;
  }

  override pushState(state: LocationState, title: string, path: string, query: string): void {
    this._stateChanges.push(state);

    this._title = title;

    const url = path + (query.length > 0 ? '?' + query : '');
    this._path = url;

    const externalUrl = this.prepareExternalUrl(url);
    this._urlChanges.push(externalUrl);
  }

  override replaceState(state: LocationState, title: string, path: string, query: string): void {
    this._stateChanges[(this._stateChanges.length || 1) - 1] = state;

    this._title = title;

    const url = path + (query.length > 0 ? '?' + query : '');
    this._path = url;

    const externalUrl = this.prepareExternalUrl(url);
    this._urlChanges.push('replace: ' + externalUrl);
  }

  override onPopState(fn: LocationChangeListener): void {
    this._sub.add(this._location$.subscribe({next: fn}));
  }

  override getBaseHref(): string {
    return this._baseHref;
  }

  override back(): void {
    if (this._urlChanges.length > 0) {
      this._urlChanges.pop();
      this._stateChanges.pop();
      const nextUrl = this._urlChanges.length > 0 ? this._urlChanges[this._urlChanges.length - 1] : '';
      this.triggerPopState(nextUrl);
    }
  }

  override forward(): void {
    return;
  }

  override getState(): unknown {
    return this._stateChanges[(this._stateChanges.length || 1) - 1];
  }
}

class LocationChangeEvent {
  pop = true;

  type = 'popstate';

  constructor(public newUrl: string) {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LocationState = any;
