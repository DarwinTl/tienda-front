import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ApiReqPostRegister } from '@api/interface/api.auth';
import { AuthRegisterForm } from '@auth/auth.type';
import { AuthRepository } from '@auth/repositories/auth-repository';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { OnlyLettersDirective } from '@shared/directives/only-letters.directive';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { ApiError } from '@shared/models/error.model';
import { CustomValidatorService } from '@shared/validators/custom-validator.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatButton,
    MatInput,
    FormFieldComponent,
    MatIcon,
    MatTooltip,
    OnlyLettersDirective,
    OnlyNumbersDirective,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly validator = inject(CustomValidatorService);
  private readonly authRepository = inject(AuthRepository);
  private readonly msg = inject(MessageService);
  private readonly router = inject(Router);

  formRegister = this.#createRegisterForm();

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
        this.msg.add({
          severity: 'success',
          summary: 'Registro exitoso',
        });
        this.router.navigate(['/autenticacion/login']);
      },
      error: ({ mensaje }: ApiError) => {
        this.msg.add({
          severity: 'error',
          summary: 'Ocurrió un error',
          detail: mensaje,
        });
      },
    });
  }
}
