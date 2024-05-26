import { Routes } from '@angular/router';
import { authRoleGuard, hasLoginGuard } from '@shared/guards/auth.guard';
import { ModulesRoutes } from './modules.routes';

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
    path: ModulesRoutes.MAINTENANCE,
    canActivate: [authRoleGuard],
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
    path: ModulesRoutes.AUTEHNTICATION,
    loadChildren: () => import('@auth/auth.routing'),
  },
];
