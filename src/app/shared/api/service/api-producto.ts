import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@api/api.const';
import {
  ReqPostMarca,
  ReqPutMarca,
  RespPostMarca,
} from '@api/interface/api-marca.interface';
import { HttpBase } from '@shared/models/http';
import { Inbox, InboxParam, ResponseInbox } from '@shared/types/utilities.type';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiProducto extends HttpBase {
  getProducto({
    page,
    size,
  }: InboxParam): Observable<Inbox<{ id: number; detalle: string }>> {
    const params = new HttpParams({ fromObject: { page, num: size } });
    const endpoint = `${API.apiProducto}/pagina`;
    return this.http
      .get<
        ResponseInbox<{ id: number; nombre: string; detalle: string }>
      >(endpoint, { params })
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

  createProducto(data: ReqPostMarca) {
    const endpoint = `${API.apiProducto}`;
    return this.http.post<RespPostMarca>(endpoint, data);
  }

  updateProducto(id: number, data: ReqPutMarca) {
    const endpoint = `${API.apiProducto}/${id}`;
    return this.http.put(endpoint, data);
  }

  deleteProducto(id: number) {
    const endpoint = `${API.apiProducto}/${id}`;
    return this.http.delete(endpoint);
  }

  getImagen(path: string) {
    const endpoint = `${API.apiProducto}/img/${path}`;
    return this.http
      .get(endpoint, { observe: 'response', responseType: 'blob' })
      .pipe(
        map((resp) => {
          return new File([resp.body as Blob], path, { type: 'image/jpeg' });
        }),
      );
  }
}
