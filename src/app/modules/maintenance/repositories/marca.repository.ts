import { inject, Injectable } from '@angular/core';
import { ReqPostMarca, ReqPutMarca } from '@api/interface/api-marca.interface';
import { ApiMarca } from '@api/service/api-marca';
import { Repository } from '@shared/models/maintenance.model';
import { InboxParam } from '@shared/types/utilities.type';

@Injectable()
export class MarcaRepository implements Repository {
  private api = inject(ApiMarca);
  get(params: InboxParam) {
    return this.api.getMarca(params);
  }
  create(data: ReqPostMarca) {
    return this.api.createMarca(data);
  }
  update(data: ReqPutMarca) {
    return this.api.updateMarca(data.id, data);
  }
  delete(id: number) {
    return this.api.deleteMarca(id);
  }
}
