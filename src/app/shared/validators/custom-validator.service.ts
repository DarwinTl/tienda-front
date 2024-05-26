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
    const passwordControl = group.get('contrasenia')!;
    const password = passwordControl!.value;
    const confirmPasswordControl = group.get('confirmarContrasenia')!;
    const confirmPassword = confirmPasswordControl!.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    const passwordStrength = passwordRegex.test(password);

    if (password == '' && confirmPassword == '') return null;

    if (password && !passwordStrength) {
      passwordControl.setErrors({ invalidPassword: true });
      return { invalidPassword: true };
    }

    if (password && confirmPassword == '') {
      return null;
    }

    if (confirmPassword && password == '') {
      passwordControl.setErrors({ passwordsDontMatch: true });
      return { passwordsDontMatch: true };
    }

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ passwordsDontMatch: true });
      return { passwordsDontMatch: true };
    }

    if (!passwordStrength) {
      passwordControl.setErrors({ invalidPassword: true });
      return { invalidPassword: true };
    }

    return null;
  };

  regex(regex: RegExp, error: string) {
    return ({ value }: AbstractControl): ValidationErrors | null =>
      regex.test(value) ? null : { [error]: true };
  }
}
