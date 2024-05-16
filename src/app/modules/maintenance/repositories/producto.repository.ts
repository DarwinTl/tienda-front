import { inject, Injectable } from '@angular/core';
import { ReqPostMarca } from '@api/interface/api-marca.interface';
import { ApiHome } from '@api/service/api-home';
import { ApiMarca } from '@api/service/api-marca';
import { ApiProducto } from '@api/service/api-producto';
import { ApiUnidadMedida } from '@api/service/api-unidad-medida';
import { Repository } from '@shared/models/maintenance.model';

@Injectable()
export class ProductoRepository implements Repository {
  private readonly api = inject(ApiProducto);
  private readonly apiMarca = inject(ApiMarca);
  private readonly apiHome = inject(ApiHome);
  private readonly apiUnidad = inject(ApiUnidadMedida);

  get(page: number) {
    return this.api.getProducto(page);
  }
  create(data: ReqPostMarca) {
    return this.api.createProducto(data);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(data: any) {
    return this.api.updateProducto(data.get('id'), data);
  }
  delete(id: number) {
    return this.api.deleteProducto(id);
  }

  getCategorias() {
    return this.apiHome.getAllCategories();
  }

  getMarcas() {
    return this.apiMarca.getMarcas();
  }

  getUnidades() {
    return this.apiUnidad.getAll();
  }
  getImagen(path: string) {
    return this.api.getImagen(path);
  }
}
