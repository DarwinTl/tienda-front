import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Marca } from './marca';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  urlEndPoint = "http://localhost:8080/tienda/marcas";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getMarcas(): Observable<Marca[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Marca[])
    )
  }

  create(marca: Marca): Observable<Marca> {
    return this.http.post(this.urlEndPoint, marca, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.marca as Marca),
      catchError(e => {
        // Swal.fire('Error al insertar ', e.error.mensaje, 'error');
        return throwError(() => e)
      })
    )
  }

  getMarca(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/marcas']);
        // Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(() => e)
      })
    )
  }

  updateMarca(marca: Marca): Observable<Marca> {
    return this.http.put(`${this.urlEndPoint}/${marca.id}`, marca, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.marca as Marca),
      catchError(e => {
        // Swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(() => e)
      })
    )
  }

  deleteMarca(id: number): Observable<Marca> {
    return this.http.delete<Marca>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        // Swal.fire('Error al eliminar la marca ', e.error.mensaje, 'error')
        return throwError(() => e)
      })
    );
  }

}
