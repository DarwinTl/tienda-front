import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
<<<<<<< HEAD
import { Router, RouterLink } from '@angular/router';
import { ApiReqPostLogin, ApiReqPostRegister } from '@api/interface/api.auth';
import { ApiHome } from '@api/service/api-home';
import { AuthLoginForm, AuthRegisterForm } from '@auth/auth.type';
import { ErrorFieldComponent } from '@components/error-field/error-field.component';
import { FormFieldComponent } from '@components/form-field/form-field.component';
=======
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiHome } from '@api/service/api-home';
>>>>>>> origin/develop
import { LoadingComponent } from '@components/loading/loading.component';
import { OnlyLettersDirective } from '@shared/directives/only-letters.directive';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { Role } from '@shared/enums/role.enum';
import { JwtService } from '@shared/services/jwt.service';
import { AuthStore } from '@shared/store/auth.store';
<<<<<<< HEAD
import { CustomValidatorService } from '@shared/validators/custom-validator.service';
=======
>>>>>>> origin/develop
import { AuthRepository } from './repositories/auth-repository';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
    RouterLink,
    LoadingComponent,
<<<<<<< HEAD
    MatProgressSpinner,
    OnlyLettersDirective,
    OnlyNumbersDirective,
=======
    RouterOutlet,
>>>>>>> origin/develop
  ],
  providers: [ApiHome, AuthRepository],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly router = inject(Router);
  private readonly authRepository = inject(AuthRepository);
  readonly authStore = inject(AuthStore);
  readonly jwtService = inject(JwtService);

  constructor() {
    effect(
      () => {
        if (this.authStore.isLogged()) {
          if (this.jwtService.authorities().includes(Role.ADMIN)) {
            this.router.navigate(['mantenimiento']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      { allowSignalWrites: true },
    );
  }
<<<<<<< HEAD

  #createRegisterForm() {
    return this.fb.group<AuthRegisterForm>(
      {
        correo: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required, this.validator.email],
        }),
        contrasenia: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        confirmarContrasenia: this.fb.control('', {
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
      },
      { validators: this.validator.passwordMatchAndStrength },
    );
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
    if (this.formRegister.invalid) return;
    const formValue = this.formRegister.getRawValue();
    const payload: ApiReqPostRegister = {
      correo: formValue.correo,
      password: formValue.contrasenia,
      nombres: formValue.nombre,
      apellidoPaterno: formValue.apellidoPaterno,
      apellidoMaterno: formValue.apellidoMaterno,
      tipoDocumento: formValue.tipoDocumento,
      numeroDocumento: formValue.numeroDocumento,
      estado: true,
    };
    this.authRepository.postCliente(payload).subscribe({
      next: () => {
        this.isRegisterForm.set(false);
      },
      error: (error) => {
        console.error(error);
      },
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

  toggleForm() {
    this.isRegisterForm.set(!this.isRegisterForm());
  }

  #login(payload: ApiReqPostLogin) {
    console.log('send login');
    this.authStore.login(payload);
  }
=======
>>>>>>> origin/develop
}
