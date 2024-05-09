import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    title: 'Pagina Inicio | Don Pepe SuperMarket',
    loadComponent: () =>
      import('@ecommerce/pages/inicio/inicio.component').then(
        (c) => c.InicioComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

export default routes;
