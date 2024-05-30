import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@api/api.const';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  categoria_product_list,
  product_List,
  productXCat,
} from './pages/inicio/Inicio.type';

@Injectable({
  providedIn: 'root',
})
export class ecommerceService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = '/api/home';
  }

  getProducts(): Observable<product_List[]> {
    return this.http
      .get<product_List[]>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        map((productos) =>
          productos.map((producto) => ({
            ...producto,
            ruta: `${API.apiProducto}/img/${producto.ruta}`,
          })),
        ),
      );
  }

  getCategories(): Observable<categoria_product_list[]> {
    return this.http.get<categoria_product_list[]>(
      `${this.myAppUrl}${this.myApiUrl}/categorias`,
    );
  }

  getProductsXCat(id: string): Observable<productXCat[]> {
    return this.http
      .get<productXCat[]>(`${this.myAppUrl}/api/home/categorias/${id}`)
      .pipe(
        map((productos) =>
          productos.map((producto) => ({
            ...producto,
            ruta: `${API.apiProducto}/img/${producto.ruta}`,
          })),
        ),
      );
  }

  getProductDetails(id: string): Observable<productXCat> {
    return this.http
      .get<productXCat>(`${this.myAppUrl}/api/home/producto/detalles/${id}`)
      .pipe(
        map((producto) => ({
          ...producto,
          ruta: `${API.apiProducto}/img/${producto.ruta}`,
        })),
      );
  }

  getProductxMarca(id: number): Observable<productXCat[]> {
    return this.http
      .get<productXCat[]>(`${this.myAppUrl}/api/home/marcas/${id}`)
      .pipe(
        map((productos) =>
          productos.map((producto) => ({
            ...producto,
            ruta: `${API.apiProducto}/img/${producto.ruta}`,
          })),
        ),
      );
  }
}
