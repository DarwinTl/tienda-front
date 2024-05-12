import { Routes } from '@angular/router';
import { authGuard, hasLoginGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [hasLoginGuard],
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
    canActivate: [authGuard],
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
