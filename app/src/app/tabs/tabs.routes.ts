import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'players',
        loadComponent: () =>
          import('../players/players.page').then((m) => m.PlayersPage),
      },
      {
        path: 'game',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: 'app/game',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'app/game',
    pathMatch: 'full',
  },
];
