import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API } from '@api/api.const';
import {
  RespPostCategoria
} from '@api/interface/api-categoria.interface';
import { ReqPostUnidadMedida, ReqPutUnidadMedida } from '@api/interface/api-unidad-medida.interface';
import { Categoria } from '@maintenance/pages/categories/categories.type';
import { HttpBase } from '@shared/models/http';
import { Inbox, ResponseInbox } from '@shared/types/utilities.type';

@Injectable()
export class ApiUnidadMedida extends HttpBase {
  getUnidaddes(page: number): Observable<Inbox<Categoria>> {
    const params = new HttpParams({ fromObject: { page, num: 5 } });
    const endpoint = `${API.apiUnidad}/pagina`;
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

  createUnidad(data: ReqPostUnidadMedida) {
    const endpoint = `${API.apiUnidad}`;
    return this.http.post<RespPostCategoria>(endpoint, data);
  }

  updateUnidad(id: number, data: ReqPutUnidadMedida) {
    const endpoint = `${API.apiUnidad}/${id}`;
    return this.http.put(endpoint, data);
  }

  deleteUnidad(id: number) {
    const endpoint = `${API.apiUnidad}/${id}`;
    return this.http.delete(endpoint);
  }
}
