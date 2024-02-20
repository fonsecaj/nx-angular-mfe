import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'drinks',
    loadComponent: () => import('./pages/drinks/drinks.component').then(m => m.DrinksComponent)
  }
];
