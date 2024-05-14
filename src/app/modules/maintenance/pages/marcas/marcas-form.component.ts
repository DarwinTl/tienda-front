import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
<<<<<<< HEAD
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
=======
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormFieldComponent } from '@components/form-field/form-field.component';
>>>>>>> origin/develop
import { OnlyLettersDirective } from '@shared/directives/only-letters.directive';

import { CustomAbstractControl } from '@shared/types/utilities.type';

export type MarcaForm = CustomAbstractControl<MarcaField>;

export type MarcaField = {
  id?: number;
  nombre: string;
  detalle: string;
};

@Component({
  selector: 'app-marcas-form',
  standalone: true,
  imports: [
    OnlyLettersDirective,
<<<<<<< HEAD
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
=======
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    MatDialogModule,
    ReactiveFormsModule,
    FormFieldComponent,
>>>>>>> origin/develop
  ],
  template: `
    <div class="max-w-xl">
      <div class="p-8">
        <h4 class="text-xl mb-6 text-center">
          {{ data ? 'Editar' : 'Registro de nueva' }} marca
        </h4>
        <form
          [formGroup]="form"
          class="grid grid-cols-1 gap-2 mx-4"
          (submit)="onSubmit()"
        >
<<<<<<< HEAD
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
=======
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
            <button
              class="grow"
              mat-stroked-button
              color="primary"
              mat-dialog-close
            >
              Cerrar
            </button>
            <button
              class="grow"
              type="submit"
              mat-raised-button
              color="primary"
              [disabled]="form.invalid"
            >
>>>>>>> origin/develop
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class MarcasFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  data: MarcaField = inject(DIALOG_DATA);
  form: FormGroup<MarcaForm>;

  constructor() {
    this.form = this.#createForm();
    this.#loadData();
  }

  #createForm() {
    return this.fb.group<MarcaForm>({
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
