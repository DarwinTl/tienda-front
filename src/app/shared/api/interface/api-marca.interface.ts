export interface Request {}

export interface RespGetMarca extends Request {}
export interface RespPostMarca {
  mensaje: string;
  marca: {
    id: number;
    detalle: string;
  };
}
export interface RespPutMarca {}
export interface RespDeleteMarca {}

export interface ReqPostMarca {
  detalle: string;
}
export interface ReqPutMarca extends Request {
  id: number;
  detalle: string;
}
export interface ReqDeleteMarca {}
