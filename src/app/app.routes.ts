import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@ecommerce/layout.component').then((c) => c.LayoutComponent),
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
];
