import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiReqPostLogin } from '@api/interface/api.auth';
import { AuthLoginForm, AuthRegisterForm } from '@auth/auth.type';
import { ErrorFieldComponent } from '@components/error-field/error-field.component';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { AuthStore } from '@shared/store/auth.store';
import { CustomValidatorService } from '@shared/validators/custom-validator.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    RouterLink,
    ReactiveFormsModule,
    FormFieldComponent,
    ErrorFieldComponent,
    MatError,
    LoadingComponent,
    MatProgressSpinner
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly fb = inject(FormBuilder);
  private readonly validator = inject(CustomValidatorService);
  // private readonly apiAuth = inject(ApiAuth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly authStore = inject(AuthStore);

  isRegisterForm = signal(true);
  formRegister = this.#createRegisterForm();
  formLogin = this.#createLoginForm();

  constructor() {
    effect(() => {
      console.log('effect', this.authStore.isLogged());
      if (this.authStore.isLogged()) {
        this.router.navigate(['mantenimiento']);
      }

    }, { allowSignalWrites: true });
  }
  
  #createRegisterForm() {
    return this.fb.group<AuthRegisterForm>({
      correo: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, this.validator.email],
      }),
      contrasenia: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      contraseniaValid: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      nombre: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      apellidoPaterno: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      apellidoMaterno: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      tipoDocumento: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      numeroDocumento: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  #createLoginForm() {
    return this.fb.group<AuthLoginForm>({
      correo: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      contrasenia: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSubmitRegister() {
    console.log('submit');
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

  toggleForm() {
    this.isRegisterForm.set(!this.isRegisterForm());
  }

  #login(payload: ApiReqPostLogin) {
    this.authStore.login(payload);
  }
}
