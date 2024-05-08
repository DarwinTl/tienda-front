export interface Request {}

export interface RespGetProduc extends Request {

}
export interface RespPostProduct {
    mensaje: string;
    marca: {
        id: number;
        detalle: string;
    };
}
export interface RespPutProduct {

}
export interface RespDeleteProduct {}

export interface ReqPostProduct {
    detalle: string;
}
export interface ReqPutProduct extends Request {
    id: number;
    detalle: string;
}
export interface ReqDeleteProduct {}

