import { Injectable } from '@angular/core';
import { API } from '@api/api.const';
import {
  ApiReqPostLogin,
  ApiReqPostRegister,
  ApiRespLogin,
} from '@api/interface/api.auth';
import { HttpBase } from '@shared/models/http';

@Injectable()
export class ApiAuth extends HttpBase {
  postRegister(body: ApiReqPostRegister) {
    const endpoint = `${API.apiAth}`;
    return this.http.post(endpoint, body);
  }

  postLogin(body: ApiReqPostLogin) {
    const endpoint = `${API.apiAth}/login`;
    return this.http.post<ApiRespLogin>(endpoint, body);
  }
}
