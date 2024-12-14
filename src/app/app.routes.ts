import { Routes } from '@angular/router';
import { authRoleGuard, hasLoginGuard } from '@shared/guards/auth.guard';
import { ModulesRoutes } from './modules.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [hasLoginGuard],
    loadChildren: () => import('@ecommerce/layout.routing'),
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
