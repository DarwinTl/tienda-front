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
    FormFieldComponent,
  ],
  template: `
    <div class="tw-relative tw-min-w-80">
      <div
        class="tw-absolute tw-inset-0 tw-bg-white tw-opacity-80 tw-rounded-lg tw-z-10"
      ></div>
      <div class="tw-relative tw-p-4 tw-z-20">
        <h4
          class="tw-text-gray-700 tw-mb-10 tw-text-center tw-font-bold tw-text-xl"
        >
          Iniciar sesión
        </h4>
        <form
          [formGroup]="formLogin"
          class="md:tw-min-w-80 tw-grid tw-grid-cols-1"
          (submit)="onSubmitLogin()"
        >
          <app-form-field>
            <mat-form-field>
              <mat-label>Correo electrónico</mat-label>
              <input
                class="tw-w-full"
                formControlName="correo"
                matInput
                type="text"
              />
            </mat-form-field>
          </app-form-field>

          <app-form-field>
            <mat-form-field>
              <mat-label>Contraseña</mat-label>
              <input
                class="tw-w-full"
                formControlName="contrasenia"
                matInput
                type="password"
              />
            </mat-form-field>
          </app-form-field>

          @if (authStore.error()) {
            <div class="tw-flex tw-mx-2 tw-pb-4">
              <p class="tw-text-red-500 tw-text-sm">{{ authStore.error() }}</p>
            </div>
          }

          <div class="tw-flex">
            <button
              type="submit"
              class="tw-w-full"
              mat-raised-button
              color="primary"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <span class="tw-my-4 line-divider">o</span>

        <div class="tw-flex tw-justify-center">
          <button
            type="button"
            class="tw-w-full"
            routerLink="../register"
            mat-stroked-button
          >
            Crear una cuenta
          </button>
        </div>
      </div>
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
    this.authStore.login(payload);
  }
}
