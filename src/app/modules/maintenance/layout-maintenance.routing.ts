import { Routes } from '@angular/router';
import { MaintenanceRoutes } from './layout.routes';

const routes: Routes = [
  {
    path: MaintenanceRoutes.CATEGORIAS,
    title: 'Mantenimiento de categorías | Market Don Pepe',
    loadComponent: () =>
      import('@maintenance/pages/categories/categories.component').then(
        (c) => c.CategoriesComponent,
      ),
  },
  {
    path: MaintenanceRoutes.PRODUCTOS,
    title: 'Mantenimiento de productos | Market Don Pepe',
    loadComponent: () =>
      import('@maintenance/pages/products/products.component').then(
        (c) => c.ProductsComponent,
      ),
  },
  {
    path: '',
    redirectTo: MaintenanceRoutes.CATEGORIAS,
    pathMatch: 'full',
  },
];

export default routes;
