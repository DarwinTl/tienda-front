import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ReqPostCategoria,
  ReqPutCategoria,
} from '@api/interface/api-categoria.interface';
import { ApiCategoria } from '@api/service/api-categoria';
import { Repository } from '@shared/models/maintenance.model';
import { Inbox, InboxParam } from '@shared/types/utilities.type';
import { DataTableCategories } from '../pages/categories/categories.type';

@Injectable()
export class CategoriaRespository implements Repository {
  private readonly api = inject(ApiCategoria);

  get(params: InboxParam): Observable<Inbox<DataTableCategories>> {
    return this.api.getCategories(params);
  }
  create(data: ReqPostCategoria) {
    return this.api.createCategory(data);
  }
  update(data: ReqPutCategoria) {
    return this.api.updateCategory(data.id, data);
  }
  delete(data: number) {
    return this.api.deleteCategory(data);
  }
}
