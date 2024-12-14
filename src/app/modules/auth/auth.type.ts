import { CustomAbstractControl } from '@shared/types/utilities.type';

export type AuthRegisterField = {
  correo: string;
  contrasenia: string;
  confirmarContrasenia: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: string;
  numeroDocumento: string;
};

export type AuthLoginField = {
  correo: string;
  contrasenia: string;
};

export type AuthRegisterForm = CustomAbstractControl<AuthRegisterField>;
export type AuthLoginForm = CustomAbstractControl<AuthLoginField>;
