export interface ApiReqPostLogin {
  correo: string;
  password: string;
}
export interface ApiRespLogin {
  usuario: string;
  mensaje: string;
  token: string;
}
export interface ApiReqPostRegister {
  correo: string;
  password: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: string;
  numeroDocumento: string;
  estado: boolean;
}
export interface ApiRespRegister {}
