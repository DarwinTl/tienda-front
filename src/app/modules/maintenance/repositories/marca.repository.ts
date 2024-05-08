import { inject, Injectable } from "@angular/core";
import { ReqPostMarca, ReqPutMarca } from "@api/interface/api-marca.interface";
import { ApiMarca } from "@api/service/api-marca";
import { Repository } from "@shared/models/maintenance.model";

@Injectable()
export class MarcaRepository implements Repository {
    private api = inject(ApiMarca); 
    get(page: number) {
        return this.api.getMarca(page);
    }
    create(data: ReqPostMarca) {
        return this.api.createMarca(data);
    }
    update(data: ReqPutMarca) {
        return this.api.updateMarca(data.id, data);
    }
    delete(id: number) {
        return this.api.deleteMarca(id);
    }
}