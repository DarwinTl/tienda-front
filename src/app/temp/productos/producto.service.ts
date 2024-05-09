import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Producto } from './producto';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  urlEndPoint = 'http://localhost:8080/tienda/productos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getProductos(): Observable<Producto[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Producto[]));
  }

  create(producto: Producto): Observable<Producto> {
    return this.http
      .post(this.urlEndPoint, producto, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.producto as Producto),
        catchError((e) => {
          // Swal.fire('Error al insertar ', e.error.mensaje, 'error');
          return throwError(() => e);
        }),
      );
  }
  create2(producto: Producto, foto: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('foto', foto);
    formData.append('estado', producto.estado.toString());
    formData.append('marca', producto.marca.id.toString());
    formData.append('categoria', producto.categoria.id.toString());
    formData.append('medida', producto.medida.id.toString());

    return this.http.post<any>(`${this.urlEndPoint}/crear`, formData).pipe(
      map((response: any) => response.producto as Producto),
      catchError((e) => {
        this.router.navigate(['/productos']);
        // Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(() => e);
      }),
    );
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/productos']);
        // Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(() => e);
      }),
    );
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http
      .put(`${this.urlEndPoint}/${producto.id}`, producto, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.producto as Producto),
        catchError((e) => {
          // Swal.fire('Error al actualizar', e.error.mensaje, 'error');
          return throwError(() => e);
        }),
      );
  }

  updateProducto2(producto: Producto, foto: File): Observable<Producto> {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('foto', foto);
    formData.append('estado', producto.estado.toString());
    formData.append('marca', producto.marca.id.toString());
    formData.append('categoria', producto.categoria.id.toString());
    formData.append('medida', producto.medida.id.toString());

    return this.http
      .put(`${this.urlEndPoint}/editar/${producto.id}`, formData)
      .pipe(
        map((response: any) => response.producto as Producto),
        catchError((e) => {
          // Swal.fire('Error al actualizar', e.error.mensaje, 'error');
          return throwError(() => e);
        }),
      );
  }

  deleteProducto(id: number): Observable<Producto> {
    return this.http
      .delete<Producto>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          // Swal.fire('Error al eliminar la marca ', e.error.mensaje, 'error')
          return throwError(() => e);
        }),
      );
  }

  subirFoto(archivo: File, id: number): Observable<Producto> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id.toString());
    return this.http.post(`${this.urlEndPoint}-foto`, formData).pipe(
      map((response: any) => response.producto as Producto),
      catchError((e) => {
        // Swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(() => e);
      }),
    );
  }
}
