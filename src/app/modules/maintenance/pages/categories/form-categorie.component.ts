import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CustomAbstractControl } from '@shared/types/utilities.type';

export type NuevoRegistroForm = CustomAbstractControl<NuevoRegistroField>;

export type NuevoRegistroField = {
  nombre: string;
  descripcion: string;
};

@Component({
  selector: 'app-form-categorie',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
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
              formControlName="nombre"
              matInput
              placeholder="Nombre"
              type="text"
            />
          </mat-form-field>
          <mat-form-field class="grow">
            <mat-label>Description</mat-label>
            <textarea
              formControlName="descripcion"
              matInput
              type="text"
            ></textarea>
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
export class FormCategorieComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  data: NuevoRegistroField = inject(DIALOG_DATA);

  form: FormGroup<NuevoRegistroForm>;

  constructor() {
    this.form = this.#createForm();
    this.#loadData();
  }

  #createForm() {
    return this.fb.group<NuevoRegistroForm>({
      nombre: this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      descripcion: this.fb.control('', { nonNullable: true }),
    });
  }

  #loadData() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }
    console.log(this.form.value);
    this.dialogRef.close(this.form.getRawValue());
  }
}
