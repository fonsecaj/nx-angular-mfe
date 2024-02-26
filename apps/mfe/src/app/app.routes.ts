import { Route } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: ``,
})
export class NoopComponent {}

export const appRoutes: Route[] = [
  {
    path: 'feature',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'feature/drinks',
    loadComponent: () => import('./pages/drinks/drinks.component').then(m => m.DrinksComponent)
  },
  {
    path: '**',
    component: NoopComponent,
  }
];