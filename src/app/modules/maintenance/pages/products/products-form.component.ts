/* eslint-disable @typescript-eslint/no-explicit-any */
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ProductoRepository } from '@maintenance/repositories/producto.repository';
import { OnlyLettersDirective } from '@shared/directives/only-letters.directive';

import { NgFor, NgIf } from '@angular/common';
import { ApiHome } from '@api/service/api-home';
import { ApiMarca } from '@api/service/api-marca';
import { ApiProducto } from '@api/service/api-producto';
import { CustomAbstractControl } from '@shared/types/utilities.type';
import { Categoria } from '../categories/categories.type';

import { ApiUnidadMedida } from '@api/service/api-unidad-medida';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { PrimeNGConfig } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { Marca } from '../marcas/marcas.type';
import { UnidadMedida } from '../unidades/unidad.type';

export type ProductoForm = CustomAbstractControl<ProductoField>;

export type ProductoField = {
  id?: number;
  nombre: string;
  descripcion: string;
  ruta: string;
  estado: boolean;
  stock: number;
  precioVenta: number;
  marca: number | null;
  categoria: number | null;
  medida: number | null;
};

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    OnlyLettersDirective,
    MatFormField,
    MatLabel,
    MatInput,
    MatPrefix,
    MatButton,
    MatIcon,
    MatDialogModule,
    MatCheckbox,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    FileUploadModule,
    ButtonModule,
    BadgeModule,
    ProgressBarModule,
    InputTextModule,
    FloatLabelModule,
    FormFieldComponent,
  ],
  providers: [
    ProductoRepository,
    ApiProducto,
    ApiMarca,
    ApiHome,
    ApiUnidadMedida,
  ],
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  private readonly repository = inject(ProductoRepository);
  data: ProductoField = inject(DIALOG_DATA);
  config = inject(PrimeNGConfig);
  form: FormGroup<ProductoForm>;

  categories = signal<Categoria[]>([]);
  marcas = signal<Marca[]>([]);
  unidades = signal<UnidadMedida[]>([]);

  constructor() {
    this.form = this.#createForm();
    this.#loadData();
    this.onLoadCategories();
    this.onLoadMarcas();
    this.onLoadUnidades();
  }

  get rutaControl() {
    return this.form.get('ruta');
  }

  onLoadCategories() {
    this.repository.getCategorias().subscribe({
      next: (response) => {
        this.categories.set(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onLoadMarcas() {
    this.repository.getMarcas().subscribe({
      next: (response) => {
        this.marcas.set(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onLoadUnidades() {
    this.repository.getUnidades().subscribe({
      next: (response) => {
        this.unidades.set(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  #createForm() {
    return this.fb.group<ProductoForm>({
      id: this.fb.control<number | undefined>(undefined, { nonNullable: true }),
      nombre: this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      descripcion: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ruta: this.fb.control('', { nonNullable: true }),
      estado: this.fb.control(true, { nonNullable: true }),
      stock: this.fb.control(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      precioVenta: this.fb.control(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      marca: this.fb.control<number | null>(null, {
        validators: [Validators.required],
      }),
      categoria: this.fb.control<number | null>(null, {
        validators: [Validators.required],
      }),
      medida: this.fb.control<number | null>(null, {
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

  choose(event: unknown, callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(
    event: unknown,
    file: unknown,
    removeFileCallback: (event: unknown, index: number) => void,
    index: number,
  ) {
    removeFileCallback(event, index);
  }

  uploadEvent(callback: () => void) {
    callback();
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes!;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  fileUpload(event: any) {
    const file = event.currentFiles[0];
    this.rutaControl?.setValue(file);
    console.log({ event, file });
  }
}
