import { Routes } from '@angular/router';
import { ApiCategoria } from '@api/service/api-categoria';
import { ApiHome } from '@api/service/api-home';
import { ApiMarca } from '@api/service/api-marca';
import { ApiProducto } from '@api/service/api-producto';
import { ApiUnidadMedida } from '@api/service/api-unidad-medida';
import {
  COLUMNS_DATA_TABLE,
  Repository,
} from '@shared/models/maintenance.model';
import { MaintenanceRoutes } from './layout.routes';
import { CATEGORIAS_COLUMNS_DATA_TABLE } from './pages/categories/categories.const';
import { MARCAS_COLUMNS_DATA_TABLE } from './pages/marcas/marcas.const';
import { PRODUCTOS_COLUMNS_DATA_TABLE } from './pages/products/products.const';
import { UNIDAD_MEDIDA_COLUMNS_DATA_TABLE } from './pages/unidades/unidad.const';
import { CategoriaRespository } from './repositories/categoria.repository';
import { MarcaRepository } from './repositories/marca.repository';
import { ProductoRepository } from './repositories/producto.repository';
import { UnidadMedidaRepository } from './repositories/unidad-medida.repository';

const routes: Routes = [
  {
    path: MaintenanceRoutes.CATEGORIAS,
    title: 'Mantenimiento de categorías | Market Don Pepe',
    loadComponent: () =>
      import('@maintenance/pages/categories/categories.component').then(
        (c) => c.CategoriesComponent,
      ),
    providers: [
      { provide: COLUMNS_DATA_TABLE, useValue: CATEGORIAS_COLUMNS_DATA_TABLE },
      { provide: Repository, useClass: CategoriaRespository },
      ApiCategoria,
    ],
  },
  {
    path: MaintenanceRoutes.MARCAS,
    title: 'Mantenimiento de marcas | Market Don Pepe',
    loadComponent: () =>
      import('@maintenance/pages/marcas/marcas.component').then(
        (c) => c.MarcasComponent,
      ),
    providers: [
      { provide: COLUMNS_DATA_TABLE, useValue: MARCAS_COLUMNS_DATA_TABLE },
      { provide: Repository, useClass: MarcaRepository },
      ApiMarca,
    ],
  },
  {
    path: MaintenanceRoutes.PRODUCTOS,
    title: 'Mantenimiento de productos | Market Don Pepe',
    providers: [
      { provide: COLUMNS_DATA_TABLE, useValue: PRODUCTOS_COLUMNS_DATA_TABLE },
      { provide: Repository, useClass: ProductoRepository },
      ApiProducto,
      ApiHome,
      ApiMarca,
    ],
    loadComponent: () =>
      import('@maintenance/pages/products/products.component').then(
        (c) => c.ProductsComponent,
      ),
  },
  {
    path: MaintenanceRoutes.UNIDADES,
    title: 'Mantenimiento de unidades de medida | Market Don Pepe',
    loadComponent: () =>
      import('@maintenance/pages/unidades/unidades.component').then(
        (c) => c.UnidadesComponent,
      ),
      providers: [
        { provide: COLUMNS_DATA_TABLE, useValue: UNIDAD_MEDIDA_COLUMNS_DATA_TABLE },
        { provide: Repository, useClass: UnidadMedidaRepository },
        ApiUnidadMedida]
  },
  {
    path: '',
    redirectTo: MaintenanceRoutes.CATEGORIAS,
    pathMatch: 'full',
  },
];

export default routes;
