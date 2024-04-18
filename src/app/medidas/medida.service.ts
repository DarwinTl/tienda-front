import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Medida } from './medida';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  urlEndPoint = "http://localhost:8080/tienda/unidades";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getMedidas(): Observable<Medida[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Medida[])
    )
  }

  create(medida: Medida): Observable<Medida> {
    return this.http.post(this.urlEndPoint, medida, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.unidad as Medida),
      catchError(e => {
        Swal.fire('Error al insertar ', e.error.mensaje, 'error');
        return throwError(() => e)
      })
    )
  }

  getMedida(id: number): Observable<Medida> {
    return this.http.get<Medida>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/medidas']);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(() => e)
      })
    )
  }

  updateMedida(medida: Medida): Observable<Medida> {
    return this.http.put(`${this.urlEndPoint}/${medida.id}`, medida, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.unidad as Medida),
      catchError(e => {
        Swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(() => e)
      })
    )
  }

  deleteMedida(id: number): Observable<Medida> {
    return this.http.delete<Medida>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar la marca ', e.error.mensaje, 'error')
        return throwError(() => e)
      })
    );
  }


}
