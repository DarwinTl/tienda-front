import { AbstractControl } from '@angular/forms';

export type CustomAbstractControl<T> = {
  [K in keyof T]: AbstractControl<T[K]>;
};
