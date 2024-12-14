import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from '@api/api.const';
import {
  ReqPostCategoria,
  ReqPutCategoria,
  RespPostCategoria,
} from '@api/interface/api-categoria.interface';
import { Categoria } from '@maintenance/pages/categories/categories.type';
import { HttpBase } from '@shared/models/http';
import { Inbox, InboxParam, ResponseInbox } from '@shared/types/utilities.type';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiCategoria extends HttpBase {
  getCategories({ page, size }: InboxParam): Observable<Inbox<Categoria>> {
    const params = new HttpParams({ fromObject: { page, num: size } });
    const endpoint = `${API.apiCategoria}/pagina`;
    return this.http.get<ResponseInbox<Categoria>>(endpoint, { params }).pipe(
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
