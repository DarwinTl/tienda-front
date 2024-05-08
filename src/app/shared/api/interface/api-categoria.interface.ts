export interface RespGetCategoria {

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
export interface ReqPutCategoria {
    id: number;
    detalle: string;
}
export interface ReqDeleteCategoria {}

