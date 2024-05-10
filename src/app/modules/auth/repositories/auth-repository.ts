import { inject, Injectable } from "@angular/core";
import { ApiReqPostRegister } from "@api/interface/api.auth";
import { ApiHome } from "@api/service/api-home";

@Injectable()
export class AuthRepository {
    private readonly api = inject(ApiHome);

    postCliente(user: ApiReqPostRegister) {
        return this.api.crearUsuario(user);
    }
}
