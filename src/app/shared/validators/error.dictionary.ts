export type ErrorDictionary = {
  default: string;
  required: string;
  minlength: string;
  maxlength: string;
  min: string;
  max: string;
  invalidEmail: string;
  password: string;
  invalidRucInitial: string;
  invalidAnioVehiculoNuevo: string;
  minPrecio: string;
  maxPrecio: string;
  minMonto: string;
  maxMonto: string;
  invalidForm: string;
  controlValueMayor: string;
  validateCuotasMax: string;
  validateCuotasMin: string;
  anioVehiculoNuevo: string;
  invalidDate: string;
  minLengthArray: string;
  invalidRadioButton: string;
};

export const ERRORS_DICTIONARY: ErrorDictionary = {
  default: 'Hay un error en el campo',
  required: 'Este campo es obligatorio',
  minlength: 'Mínimo $requiredLength caracteres',
  maxlength: 'Máximo $requiredLength caracteres',
  max: 'El valor máximo es $max',
  min: 'El valor mínino es $min',
  invalidEmail: 'Ingresar un correo válido usuario@dominio.com',
  password: 'contraseña no valida',
  invalidRucInitial: 'Debe iniciar con $persona o $empresa',
  invalidAnioVehiculoNuevo:
    'El año seleccionado debe ser mayor a año fabricación',
  minPrecio: 'El precio mínimo $minPrecio',
  maxPrecio: 'El precio máximo $maxPrecio',
  minMonto: 'El monto mínimo es $minMonto',
  maxMonto: 'El monto máximo es $maxMonto',
  invalidForm: 'Debes completar todos los campos para continuar',
  controlValueMayor: '$controlMayor no puede ser mayor a $controlMenor',
  validateCuotasMax: 'El valor máximo de cuotas es $maxCuotas',
  validateCuotasMin: 'El valor mínimo de cuotas es $minCuotas',
  anioVehiculoNuevo: 'Debe ser mayor al año de fabricación',
  invalidDate: 'Fecha no válida',
  minLengthArray: `Debes agregar mínimo $min elemento(s)`,
  invalidRadioButton: 'Debes seleccionar una opción',
};
const json = JSON.stringify(ERRORS_DICTIONARY, null, 2);

export default json;
