export type ErrorDictionary = {
  default: string;
  required: string;
  invalidEmail: string;
};

export const ERRORS_DICTIONARY: ErrorDictionary = {
  default: 'Hay un error en el campo',
  required: 'Este campo es obligatorio',
  invalidEmail: 'El formtaro de correo es inválido',
};
const json = JSON.stringify(ERRORS_DICTIONARY, null, 2);
export default json;
