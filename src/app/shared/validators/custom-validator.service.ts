import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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

  passwordMatchAndStrength: ValidatorFn = (
    group: AbstractControl,
  ): ValidationErrors | null => {
    const password = group.get('contrasenia')!.value;
    const confirmPassword = group.get('confirmarContrasenia')!.value;

    if (password == '' || confirmPassword == '') return null;

    if (password !== confirmPassword) {
      return { passwordsDontMatch: true };
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    return passwordRegex.test(password) ? null : { invalidPassword: true };
  };

  regex(regex: RegExp, error: string) {
    return ({ value }: AbstractControl): ValidationErrors | null =>
      regex.test(value) ? null : { [error]: true };
  }
}
