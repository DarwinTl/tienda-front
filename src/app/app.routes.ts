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
    path: 'autenticacion',
    loadChildren: () => import('@auth/auth.routing'),
  },
];
