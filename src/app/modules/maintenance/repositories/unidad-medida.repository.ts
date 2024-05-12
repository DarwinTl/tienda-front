import { inject, Injectable } from '@angular/core';
import { ReqPostUnidadMedida, ReqPutUnidadMedida } from '@api/interface/api-unidad-medida.interface';
import { ApiUnidadMedida } from '@api/service/api-unidad-medida';
import { Repository } from '@shared/models/maintenance.model';

@Injectable()
export class UnidadMedidaRepository implements Repository {
  private api = inject(ApiUnidadMedida);
  get(page: number) {
    return this.api.getUnidaddes(page);
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
}
