import { Injectable } from '@angular/core';
import { API } from '@api/api.const';
import {
  ReqPostMarca,
  ReqPutMarca,
  RespPostMarca,
} from '@api/interface/api-marca.interface';
import { HttpBase } from '@shared/models/http';
import { Inbox, ResponseInbox } from '@shared/types/utilities.type';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiMarca extends HttpBase {
  getMarca(page: number): Observable<Inbox<{ id: number; detalle: string }>> {
    const endpoint = `${API.apiMarca}/pagina/${page}`;
    return this.http
      .get<
        ResponseInbox<{ id: number; nombre: string; detalle: string }>
      >(endpoint)
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

  createMarca(data: ReqPostMarca) {
    const endpoint = `${API.apiMarca}`;
    return this.http.post<RespPostMarca>(endpoint, data);
  }

  updateMarca(id: number, data: ReqPutMarca) {
    const endpoint = `${API.apiMarca}/${id}`;
    return this.http.put(endpoint, data);
  }

  deleteMarca(id: number) {
    const endpoint = `${API.apiMarca}/${id}`;
    return this.http.delete(endpoint);
  }
}
