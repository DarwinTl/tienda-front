import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Categoria } from './categoria';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  urlEndPoint = 'http://localhost:8080/tienda/categorias';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Categoria[]));
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post(this.urlEndPoint, categoria, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.categoria as Categoria),
        catchError((e) => {
          // Swal.fire('Error al insertar', e.error.mensaje, 'error');
          return throwError(() => e);
        }),
      );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/categorias']);
        // Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      }),
    );
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http
      .put(`${this.urlEndPoint}/${categoria.id}`, categoria, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.categoria as Categoria),
        catchError((e) => {
          // Swal.fire('Error al actualizar', e.error.mensaje, 'error');
          return throwError(() => e);
        }),
      );
  }

  deleteCategoria(id: number): Observable<Categoria> {
    return this.http
      .delete<Categoria>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          // Swal.fire('Error al eliminar la categoria ', e.error.mensaje, 'error')
          return throwError(() => e);
        }),
      );
  }
}
