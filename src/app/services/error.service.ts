import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  msJError(e: HttpErrorResponse) {
    if (e.error.msg) {
        Swal.fire('Mensaje', e.error.msg, 'error');
    } else {
        Swal.fire('Error', 'Ups Ocurrio un error', 'error');
    }
  }
}
