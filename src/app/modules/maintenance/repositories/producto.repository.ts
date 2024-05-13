import { inject, Injectable } from '@angular/core';
import { ReqPostMarca, ReqPutMarca } from '@api/interface/api-marca.interface';
import { ApiHome } from '@api/service/api-home';
import { ApiMarca } from '@api/service/api-marca';
import { ApiProducto } from '@api/service/api-producto';
import { Repository } from '@shared/models/maintenance.model';

@Injectable()
export class ProductoRepository implements Repository {
  private readonly api = inject(ApiProducto);
  private readonly apiMarca = inject(ApiMarca);
  private readonly apiHome = inject(ApiHome);

  get(page: number) {
    return this.api.getProducto(page);
  }
  create(data: ReqPostMarca) {
    return this.api.createProducto(data);
  }
  update(data: ReqPutMarca) {
    return this.api.updateProducto(data.id, data);
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
}
