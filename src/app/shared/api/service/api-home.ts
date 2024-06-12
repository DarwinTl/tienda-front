import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@api/api.const';
import {
  ReqPostAgregarProductoACarrito,
  RespAgregarProductoCarrito,
} from '@api/interface/api-home.interface';
import { ApiReqPostRegister } from '@api/interface/api.auth';
import { Categoria } from '@maintenance/pages/categories/categories.type';
import { HttpBase } from '@shared/models/http';
import { ProductoCart } from '@shared/store/shop.store';
import { map } from 'rxjs';

@Injectable()
export class ApiHome extends HttpBase {
  getAllCategories() {
    const endpoint = `${API.apiHome}/categorias`;
    return this.http.get<Categoria[]>(endpoint);
  }

  crearUsuario(user: ApiReqPostRegister) {
    const endpoint = `${API.apiHome}/registrar`;
    return this.http.post<{ mensaje: string }>(endpoint, user);
  }

  agregarProductoACarrito(payload: ReqPostAgregarProductoACarrito) {
    const endpoint = `${API.apiHome}/add/producto/${payload.idProducto}`;
    const params = new HttpParams({
      fromObject: { userId: payload.userId, cantidad: payload.cantidad },
    });
    return this.http.post<RespAgregarProductoCarrito>(endpoint, {}, { params });
  }

  removerProductoDeCarrito(payload: { idProducto: number; userId: number }) {
    const endpoint = `${API.apiHome}/remove/${payload.idProducto}`;
    const params = new HttpParams({
      fromObject: { idUsuario: payload.userId },
    });
    return this.http.delete(endpoint, { params });
  }

  obtenerCarrito(userId: number) {
    const endpoint = `${API.apiHome}/carrito/${userId}`;
    return this.http.get<RespAgregarProductoCarrito>(endpoint).pipe(
      map((result) => {
        return {
          ...result,
          items: result.items.map<ProductoCart>((item) => ({
            ...item,
            ...item.producto,
            idCarrito: item.id,
            isLoading: false,
            total: result.total,
            ruta: `${API.apiProducto}/img/${item.producto.ruta}`,
          })),
        };
      }),
    );
  }
}
