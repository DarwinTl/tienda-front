import { API } from "@api/api.const";
import { GetOrden } from "@api/interface/api-orden.interface";
import { HttpBase } from "@shared/models/http";

export class ApiOrden extends HttpBase {
  getOrdenes() {
    const endpoint = `${API.apiBase}/ordenes`;
    return this.http.get<GetOrden[]>(endpoint);
  }

  aporbarOrden(boleta: string) {
    const endpoint = `${API.apiBase}/ordenes/aprobar?numero=${boleta}`;
    return this.http.put(endpoint, {});
  }

  prepararOrden(boleta: string) {
    const endpoint = `${API.apiBase}/ordenes/preparar?numero=${boleta}`;
    return this.http.put(endpoint, {});
  }

  ingresarCompra(userId: number) {
    const endpoint = `${API.apiBase}/home/comprar/${userId}`;
    return this.http.post(endpoint, {})
  }

  buscarNumeroBoleta(nroBoleta: string) {
    const endpoint = `${API.apiBase}/ordenes/${nroBoleta}`;
    return this.http.get<GetOrden>(endpoint);
  }
}