import { Categoria } from '@maintenance/pages/categories/categories.type';

export interface Request {}

export interface RespGetCategoria extends Request {}
export interface RespPostCategoria {
  mensaje: string;
  categoria: Categoria;
}
export interface RespPutCategoria {}
export interface RespDeleteCategoria {}

export interface ReqPostCategoria {
  nombre: string;
  detalle: string;
  icono?: string;
}
export interface ReqPutCategoria extends Request {
  id: number;
  nombre: string;
  detalle: string;
  icono?: string;
}
export interface ReqDeleteCategoria {}
