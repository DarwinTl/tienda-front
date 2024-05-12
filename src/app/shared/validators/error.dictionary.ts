export type ErrorDictionary = {
  default: string;
  required: string;
};

export const ERRORS_DICTIONARY: ErrorDictionary = {
  default: 'Hay un error en el campo',
  required: 'Este campo es obligatorio',
};
const json = JSON.stringify(ERRORS_DICTIONARY, null, 2);
export default json;
