import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('../app/app.component').then(m => m.AppComponent)
  },

  {
    path: 'items',
    loadComponent: () => import('./features/items/items.component').then(m => m.ItemsComponent)
  },
];
