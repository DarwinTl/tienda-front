import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  categoria_product_list,
  productXCat,
  product_List,
} from './pages/inicio/Inicio.type';
import { Observable } from 'rxjs';
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
    console.log(`${this.myAppUrl}${this.myApiUrl}`);
    return this.http.get<product_List[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCategories(): Observable<categoria_product_list[]> {
    // console.log(`${this.myAppUrl}${this.myApiUrl}`);
    return this.http.get<categoria_product_list[]>(
      `${this.myAppUrl}${this.myApiUrl}/categorias`,
    );
  }

  getProductsXCat(id: string): Observable<productXCat[]> {
    return this.http.get<productXCat[]>(`${this.myAppUrl}/api/home/categorias/${id}`);
  }

  getProductDetails(id: string): Observable<productXCat> {
    return this.http.get<productXCat>(`${this.myAppUrl}/api/home/producto/detalles/${id}`);
  }

  getProductxMarca(id: number): Observable<productXCat[]> {
    return this.http.get<productXCat[]>(`${this.myAppUrl}/api/home/marcas/${id}`);
  }
}
