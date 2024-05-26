import { Injectable } from '@angular/core';
import { API } from '@api/api.const';
import { ApiReqPostRegister } from '@api/interface/api.auth';
import { Categoria } from '@maintenance/pages/categories/categories.type';
import { HttpBase } from '@shared/models/http';

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
}
