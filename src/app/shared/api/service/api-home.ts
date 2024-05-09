import { Injectable } from '@angular/core';
import { API } from '@api/api.const';
import { Categoria } from '@maintenance/pages/categories/categories.type';
import { HttpBase } from '@shared/models/http';

@Injectable()
export class ApiHome extends HttpBase {
  getAllCategories() {
    const endpoint = `${API.apiHome}/categorias`;
    return this.http.get<Categoria[]>(endpoint);
  }
}
