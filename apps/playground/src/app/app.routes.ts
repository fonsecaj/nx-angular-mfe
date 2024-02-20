import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'mfe-shell',
    loadComponent: () => import('./pages/mfe-shell/mfe-shell.component').then(m => m.MfeShellComponent)
  }
];
