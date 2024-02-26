import { Route, UrlMatchResult, UrlSegment } from '@angular/router';

export function matchFeatureRoute(url: UrlSegment[]): UrlMatchResult | null {
  return url[0].path === 'feature' ? { consumed: url } : null;
}

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    matcher: matchFeatureRoute,
    loadComponent: () => import('./pages/mfe-shell/mfe-shell.component').then(m => m.MfeShellComponent)
  },
];
