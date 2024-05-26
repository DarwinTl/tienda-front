import { Routes } from '@angular/router';
import { AuthRoutes } from './auth.routes';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@auth/auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: AuthRoutes.LOGIN,
        loadComponent: () =>
          import('@auth/pages/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: AuthRoutes.REGISTER,
        loadComponent: () =>
          import('@auth/pages/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
      {
        path: '',
        redirectTo: AuthRoutes.LOGIN,
        pathMatch: 'full',
      },
    ],
  },
];

export default routes;
