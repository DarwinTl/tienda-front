import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { product_List } from './pages/inicio/Inicio.type';
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
    console.log(`${this.myAppUrl}${this.myApiUrl}`)
    return this.http.get<product_List[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}