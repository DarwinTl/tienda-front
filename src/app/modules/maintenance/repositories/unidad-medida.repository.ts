import { inject, Injectable } from '@angular/core';
import {
  ReqPostUnidadMedida,
  ReqPutUnidadMedida,
} from '@api/interface/api-unidad-medida.interface';
import { ApiUnidadMedida } from '@api/service/api-unidad-medida';
import { Repository } from '@shared/models/maintenance.model';
import { InboxParam } from '@shared/types/utilities.type';

@Injectable()
export class UnidadMedidaRepository implements Repository {
  private api = inject(ApiUnidadMedida);
  get(page: InboxParam) {
    return this.api.getUnidades(page);
  }
  create(data: ReqPostUnidadMedida) {
    return this.api.createUnidad(data);
  }
  update(data: ReqPutUnidadMedida) {
    return this.api.updateUnidad(data.id, data);
  }
  delete(id: number) {
    return this.api.deleteUnidad(id);
  }

  getAll() {
    return this.api.getAll();
  }
}
