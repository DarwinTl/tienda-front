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

export type CategoriaForm = CustomAbstractControl<CategoriaField>;

export type CategoriaField = {
  id?: number;
  nombre: string;
  detalle: string;
  icono?: string;
};

@Component({
  selector: 'app-categories-form',
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
          {{ data ? 'Editar' : 'Registro de nueva' }} categoria
        </h4>
        <form
          [formGroup]="form"
          class="tw-grid tw-grid-cols-1 tw-gap-2 tw-mx-4"
          (submit)="onSubmit()"
        >
          <app-form-field>
            <mat-form-field class="grow">
              <mat-label>Nombre</mat-label>
              <input
                appOnlyLetters
                formControlName="nombre"
                matInput
                placeholder="Nombre"
                type="text"
              />
            </mat-form-field>
          </app-form-field>

          <app-form-field>
            <mat-form-field class="grow">
              <mat-label>Description</mat-label>
              <textarea
                formControlName="detalle"
                matInput
                type="text"
              ></textarea>
            </mat-form-field>
          </app-form-field>

          <div class="flex justify-center gap-4">
            <button mat-stroked-button color="primary" mat-dialog-close>
              Cerrar
            </button>
            <button
              [disabled]="form.invalid"
              type="submit"
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
})
export class CategoriesFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  data: CategoriaField = inject(DIALOG_DATA);
  form: FormGroup<CategoriaForm>;

  constructor() {
    this.form = this.#createForm();
    this.#loadData();
  }

  #createForm() {
    return this.fb.group<CategoriaForm>({
      id: this.fb.control<number | undefined>(undefined, { nonNullable: true }),
      nombre: this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      detalle: this.fb.control('', { nonNullable: true }),
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
