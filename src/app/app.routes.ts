import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@ecommerce/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@ecommerce/layout.routing'),
      },
    ],
  },
  {
    path: 'mantenimiento',
    loadComponent: () =>
      import('@maintenance/layout-maintenance.component').then(
        (c) => c.LayoutMaintenanceComponent,
      ),
    children: [
      {
        path: '',
        loadChildren: () => import('@maintenance/layout-maintenance.routing'),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@auth/auth.component').then((c) => c.AuthComponent),
  },
];
