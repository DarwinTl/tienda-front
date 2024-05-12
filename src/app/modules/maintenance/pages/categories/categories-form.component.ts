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
  ],
  template: `
    <div class="max-w-xl">
      <div class="p-8">
        <h4 class="text-xl mb-6 text-center">
          {{ data ? 'Editar' : 'Registro de nueva' }} categoria
        </h4>
        <form
          [formGroup]="form"
          class="grid grid-cols-1 gap-2 mx-4"
          (submit)="onSubmit()"
        >
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
          <mat-form-field class="grow">
            <mat-label>Description</mat-label>
            <textarea formControlName="detalle" matInput type="text"></textarea>
          </mat-form-field>
          <div class="flex justify-center gap-4">
            <button mat-button color="warn" mat-dialog-close>Cerrar</button>
            <button type="submit" mat-raised-button color="primary">
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
