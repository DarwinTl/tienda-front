import { Injectable } from '@angular/core';

import { API } from '@api/api.const';
import {
  ReqPostCategoria,
  ReqPutCategoria,
  RespPostCategoria,
} from '@api/interface/api-categoria.interface';
import { HttpBase } from '@shared/models/http';
import { Inbox, ResponseInbox } from '@shared/types/utilities.type';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiCategoria extends HttpBase {
  getCategories(
    page: number,
  ): Observable<Inbox<{ id: number; detalle: string }>> {
    const endpoint = `${API.apiCategoria}/pagina/${page}`;
    return this.http
      .get<ResponseInbox<{ id: number; detalle: string }>>(endpoint)
      .pipe(
        map((resp) => ({
          content: resp.content,
          totalElements: resp.totalElements,
          totalPages: resp.totalPages,
          currentPage: resp.number,
          lastPage: resp.last,
          firstPage: resp.first,
          itemsPerPage: resp.size,
        })),
      );
  }

  createCategory(data: ReqPostCategoria) {
    const endpoint = `${API.apiCategoria}`;
    return this.http.post<RespPostCategoria>(endpoint, data);
  }

  updateCategory(id: number, data: ReqPutCategoria) {
    const endpoint = `${API.apiCategoria}/${id}`;
    return this.http.put(endpoint, data);
  }

  deleteCategory(id: number) {
    const endpoint = `${API.apiCategoria}/${id}`;
    return this.http.delete(endpoint);
  }
}
