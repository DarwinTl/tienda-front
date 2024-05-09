import { inject, Injectable } from '@angular/core';
import { ReqPostMarca, ReqPutMarca } from '@api/interface/api-marca.interface';
import { ApiProducto } from '@api/service/api-producto';
import { Repository } from '@shared/models/maintenance.model';

@Injectable()
export class ProductoRepository implements Repository {
  private api = inject(ApiProducto);
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
}
