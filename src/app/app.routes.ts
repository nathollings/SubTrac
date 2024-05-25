import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'players',
    loadComponent: () => import('./players/players.page').then( m => m.PlayersPage)
  },
  {
    path: 'add',
    loadComponent: () => import('./players/add/add.page').then( m => m.AddPage)
  },
];
