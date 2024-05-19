import { UnidadMedida } from '@maintenance/pages/unidades/unidad.type';

export interface Request {}

export interface RespGetUnidadMedida extends Request {}
export interface RespPostUnidadMedida {
  mensaje: string;
  categoria: UnidadMedida;
}
export interface RespPutUnidadMedida {}
export interface RespDeleteUnidadMedida {}

export interface ReqPostUnidadMedida {
  descripcion: string;
}
export interface ReqPutUnidadMedida extends Request {
  id: number;
  descripcion: string;
}
export interface ReqDeleteUnidadMedida {}
