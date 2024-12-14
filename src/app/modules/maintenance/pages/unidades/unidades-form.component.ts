import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { OnlyLettersDirective } from '@shared/directives/only-letters.directive';
import { CustomAbstractControl } from '@shared/types/utilities.type';

export type UnidadMedidaForm = CustomAbstractControl<UnidadMedidaField>;

export type UnidadMedidaField = {
  id?: number;
  descripcion: string;
};

@Component({
  selector: 'app-unidades-form',
  standalone: true,
  imports: [
    OnlyLettersDirective,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    MatDialogModule,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
  template: `
    <div class="tw-max-w-xl">
      <div class="tw-p-8">
        <h4 class="tw-text-xl tw-mb-6 tw-text-center">
          {{ data ? 'Editar' : 'Registro de nueva' }} unidad medida
        </h4>
        <form
          [formGroup]="form"
          class="tw-grid tw-grid-cols-1 tw-gap-2 tw-mx-4"
          (submit)="onSubmit()"
        >
          <app-form-field>
            <mat-form-field class="tw-grow">
              <mat-label>Description</mat-label>
              <input formControlName="descripcion" matInput type="text" />
            </mat-form-field>
          </app-form-field>

          <div class="tw-flex tw-justify-center tw-gap-4">
            <button
              class="tw-grow"
              mat-stroked-button
              color="primary"
              mat-dialog-close
            >
              Cerrar
            </button>
            <button
              class="tw-grow"
              type="submit"
              [disabled]="form.invalid"
              mat-raised-button
              color="primary"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class UnidadesFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  data: UnidadMedidaField = inject(DIALOG_DATA);
  form: FormGroup<UnidadMedidaForm>;

  constructor() {
    this.form = this.#createForm();
    this.#loadData();
  }

  #createForm() {
    return this.fb.group<UnidadMedidaForm>({
      id: this.fb.control<number | undefined>(undefined, { nonNullable: true }),
      descripcion: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  #loadData() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }
}
