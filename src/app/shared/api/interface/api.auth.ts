export interface ApiReqPostLogin {
  correo: string;
  password: string;
}
export interface ApiRespLogin {
  usuario: string;
  mensaje: string;
  token: string;
}
export interface ApiReqPostRegister {}
export interface ApiRespRegister {}
