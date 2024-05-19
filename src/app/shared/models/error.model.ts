export class ApiError {
  mensaje: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(error: string) {
    this.mensaje = error;
  }
}
