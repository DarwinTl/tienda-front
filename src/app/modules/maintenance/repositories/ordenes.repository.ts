import { inject, Injectable } from "@angular/core";
import { ApiOrden } from "@api/service/api-orden";
import { Repository } from "@shared/models/maintenance.model";
import { Inbox, Request } from "@shared/types/utilities.type";
import { Observable } from "rxjs";

@Injectable()
export class OrdenesRepository implements Repository {
  private apiOrdenes = inject(ApiOrden);
  get(): Observable<Inbox<>> {
    return this.apiOrdenes.getOrdenes();
  }

  create(data: Request<any>): Observable<unknown> {
    throw new Error("Method not implemented.");
  }
  update(data: Request<any>): Observable<unknown> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Observable<unknown> {
    throw new Error("Method not implemented.");
  }

}