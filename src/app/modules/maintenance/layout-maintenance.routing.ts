import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categorias',
    title: 'Mantenimiento de categorías | Market Don Pepe',
    loadComponent: () =>
      import('@maintenance/pages/categories/categories.component').then(
        (c) => c.CategoriesComponent,
      ),
  },
  {
    path: 'productos',
    title: 'Mantenimiento de productos | Market Don Pepe',
    loadComponent: () =>
      import('@maintenance/pages/products/products.component').then(
        (c) => c.ProductsComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'categorias',
    pathMatch: 'full',
  },
];

export default routes;
