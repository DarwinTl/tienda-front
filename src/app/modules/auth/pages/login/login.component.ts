import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ApiReqPostLogin } from '@api/interface/api.auth';
import { AuthLoginForm } from '@auth/auth.type';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { AuthStore } from '@shared/store/auth.store';
import { CustomValidatorService } from '@shared/validators/custom-validator.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    RouterLink,
    FormFieldComponent
  ],
  template: `
    <h4 class="text-gray-700 mb-10 text-center font-bold text-xl">
      Iniciar sesión
    </h4>
    <form
      [formGroup]="formLogin"
      class="md:min-w-80 grid grid-cols-1"
      (submit)="onSubmitLogin()"
    >
    <app-form-field>
      <mat-form-field>
        <mat-label>Correo electrónico</mat-label>
        <input class="w-full" formControlName="correo" matInput type="text" />
      </mat-form-field>
    </app-form-field>

    <app-form-field>
      <mat-form-field>
        <mat-label>Contraseña</mat-label>
        <input
          class="w-full"
          formControlName="contrasenia"
          matInput
          type="password"
        />
      </mat-form-field>
    </app-form-field>

      @if (authStore.error()) {
        <div class="flex mx-2 pb-4">
          <p class="text-red-500 text-sm">{{ authStore.error() }}</p>
        </div>
      }

      <div class="flex">
        <button type="submit" class="w-full" mat-raised-button color="accent">
          Iniciar sesión
        </button>
      </div>
    </form>
    <span class="my-4 line-divider">o</span>

    <div class="flex justify-center">
      <button type="button" class="w-full" routerLink="../register" mat-button>
        Crear una cuenta
      </button>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  private readonly validator = inject(CustomValidatorService);
  formLogin = this.#createLoginForm();

  #createLoginForm() {
    return this.fb.group<AuthLoginForm>({
      correo: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, this.validator.email],
      }),
      contrasenia: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSubmitLogin() {
    if (this.formLogin.invalid) return;
    const formValue = this.formLogin.getRawValue();
    const payload: ApiReqPostLogin = {
      correo: formValue.correo,
      password: formValue.contrasenia,
    };
    this.#login(payload);
  }

  #login(payload: ApiReqPostLogin) {
    console.log('send login');
    this.authStore.login(payload);
  }
}
