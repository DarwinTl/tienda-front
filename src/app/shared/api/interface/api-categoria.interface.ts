export interface Request {}

export interface RespGetCategoria extends Request {

}
export interface RespPostCategoria {
    mensaje: string;
    categoria: {
        id: number;
        detalle: string;
    };
}
export interface RespPutCategoria {

}
export interface RespDeleteCategoria {}

export interface ReqPostCategoria {
    detalle: string;
}
export interface ReqPutCategoria extends Request {
    id: number;
    detalle: string;
}
export interface ReqDeleteCategoria {}

