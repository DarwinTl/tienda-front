import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EMAIL_REGEXR } from '@shared/utils/const';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {
  email({ value }: AbstractControl): ValidationErrors | null {
    if (!value) return null;

    let subdominios = false;
    const dominio = value.split('@')[1];

    if (dominio) {
      subdominios = dominio.split('.').length <= 3;
    }

    return EMAIL_REGEXR.test(value) && subdominios
      ? null
      : { invalidEmail: true };
  }

  regex(regex: RegExp, error: string) {
    return ({ value }: AbstractControl): ValidationErrors | null =>
      regex.test(value) ? null : { [error]: true };
  }
}
