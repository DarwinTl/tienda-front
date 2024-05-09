import { Injectable } from '@angular/core';

import { API } from '@api/api.const';
import {
  ReqPostCategoria,
  ReqPutCategoria,
  RespPostCategoria,
} from '@api/interface/api-categoria.interface';
import { ApiHttpBase } from '@shared/models/http';

@Injectable()
export class ApiCategoria extends ApiHttpBase {
  getCategories() {
    const endpoint = `${API.apiCategoria}`;
    return this.http.get(endpoint);
  }

  createCategory(data: ReqPostCategoria) {
    return this.http.post<RespPostCategoria>('/categories', data);
  }

  updateCategory(id: number, data: ReqPutCategoria) {
    return this.http.put(`/categories/${id}`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`/categories/${id}`);
  }
}
