import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ApiReqPostLogin } from '@api/interface/api.auth';
import { AuthRoutes } from '@auth/auth.routes';
import { AuthLoginForm } from '@auth/auth.type';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { AuthStore } from '@shared/store/auth.store';
import { CustomValidatorService } from '@shared/validators/custom-validator.service';
import { ModulesRoutes } from 'src/app/modules.routes';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { NgxCaptchaModule } from 'ngx-captcha';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatFormField,
    MatLabel,
    MatInput,
    RouterLink,
    FormFieldComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxCaptchaModule
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
          (ngSubmit)="onSubmitLogin()"
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
                [type]="hide ? 'password' : 'text'"
              />
              <button
                type="button"
                mat-icon-button
                matSuffix
                (click)="hide = !hide"
                [attr.aria-label]="'Ocultar contraseña'"
                [attr.aria-pressed]="hide"
              >
                <mat-icon>{{
                  hide ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
            </mat-form-field>
          </app-form-field>
          <div class="tw-flex tw-justify-center mb-4">
    <re-captcha (resolved)="resolved($event)" [siteKey]="siteKey" formControlName="recaptcha"></re-captcha>
    </div>
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
              [disabled]="!captchaResolved"
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
            (click)="navigateToRegister()"
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
  private router = inject(Router);
  formLogin = this.#createLoginForm();
  hide = true;
  siteKey: string = "6LfC3hQqAAAAAJFKsjWGVUbzr8aFC-kO1dpRyeuw";
  captchaResolved = false;

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
      recaptcha: this.fb.control('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmitLogin() {
    if (this.formLogin.invalid || !this.captchaResolved) {
      if (!this.captchaResolved) {
        console.error('Captcha is not resolved');
      }
      return;
    }
    const formValue = this.formLogin.getRawValue();
    const payload: ApiReqPostLogin = {
      correo: formValue.correo,
      password: formValue.contrasenia,
    };
    this.#login(payload);
  }

  navigateToRegister() {
    this.authStore.restoreError();
    this.router.navigate([ModulesRoutes.AUTEHNTICATION, AuthRoutes.REGISTER]);
  }

  #login(payload: ApiReqPostLogin) {
    this.authStore.login(payload);
  }

  resolved(captchaResponse: string | null) {
    if (captchaResponse) {
      this.captchaResolved = true;
      console.log(`Resolved captcha with response: ${captchaResponse}`);
    } else {
      this.captchaResolved = false;
      console.error('Captcha response was null');
    }
  }
}
