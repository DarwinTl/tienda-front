import { Routes } from '@angular/router';
import { menuResolve } from '@shared/guards/menu.resolve';

const routes: Routes = [
  {

    path: '',
    resolve: { menu: menuResolve },
    loadComponent: () =>
      import('@ecommerce/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'categoria/:categoria',
        title: 'Pagina Busqueda | Don Pepe SuperMarket',
        loadComponent: () =>
          import('@ecommerce/pages/cuerpo/cuerpo.component').then(
            (c) => c.CuerpoComponent,
          ),
      },
      {
        path: 'producto-detalle',
        title: 'Producto | Don Pepe SuperMarket',
        loadComponent: () =>
          import('@ecommerce/pages/producto-detalle/producto-detalle.component').then(
            (c) => c.ProductoDetalleComponent,
          ),
      },
      {
        path: '',
        title: 'Pagina Inicio | Don Pepe SuperMarket',
        loadComponent: () =>
          import('@ecommerce/pages/inicio/inicio.component').then(
            (c) => c.InicioComponent,
          ),
      },
    ],
  },
];

export default routes;
