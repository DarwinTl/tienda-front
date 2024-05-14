/* eslint-disable @typescript-eslint/no-explicit-any */
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
<<<<<<< HEAD
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
=======
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
>>>>>>> origin/develop
import { ProductoRepository } from '@maintenance/repositories/producto.repository';
import { OnlyLettersDirective } from '@shared/directives/only-letters.directive';

import { NgFor, NgIf } from '@angular/common';
import { ApiHome } from '@api/service/api-home';
import { ApiMarca } from '@api/service/api-marca';
import { ApiProducto } from '@api/service/api-producto';
import { CustomAbstractControl } from '@shared/types/utilities.type';
import { Categoria } from '../categories/categories.type';

<<<<<<< HEAD
=======
import { ApiUnidadMedida } from '@api/service/api-unidad-medida';
import { FormFieldComponent } from '@components/form-field/form-field.component';
>>>>>>> origin/develop
import { PrimeNGConfig } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { Marca } from '../marcas/marcas.type';
<<<<<<< HEAD
=======
import { UnidadMedida } from '../unidades/unidad.type';
>>>>>>> origin/develop

export type ProductoForm = CustomAbstractControl<ProductoField>;

export type ProductoField = {
  id?: number;
  nombre: string;
  descripcion: string;
  ruta: string;
  estado: boolean;
<<<<<<< HEAD
  stock: number;
  precioVenta: number;
  marca: number;
  categoria: number;
  medida: number;
=======
  stock: number | null;
  precioVenta: number | null;
  marca: number | null;
  categoria: number | null;
  medida: number | null;
>>>>>>> origin/develop
};

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    OnlyLettersDirective,
<<<<<<< HEAD
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
=======
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
>>>>>>> origin/develop
    ReactiveFormsModule,
    FileUploadModule,
    ButtonModule,
    BadgeModule,
    ProgressBarModule,
    InputTextModule,
    FloatLabelModule,
<<<<<<< HEAD
  ],
  providers: [ProductoRepository, ApiProducto, ApiMarca, ApiHome],
=======
    FormFieldComponent,
  ],
  providers: [
    ProductoRepository,
    ApiProducto,
    ApiMarca,
    ApiHome,
    ApiUnidadMedida,
  ],
>>>>>>> origin/develop
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
<<<<<<< HEAD
=======
  unidades = signal<UnidadMedida[]>([]);
>>>>>>> origin/develop

  constructor() {
    this.form = this.#createForm();
    this.#loadData();
    this.onLoadCategories();
    this.onLoadMarcas();
<<<<<<< HEAD
=======
    this.onLoadUnidades();
>>>>>>> origin/develop
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

<<<<<<< HEAD
=======
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

>>>>>>> origin/develop
  #createForm() {
    return this.fb.group<ProductoForm>({
      id: this.fb.control<number | undefined>(undefined, { nonNullable: true }),
      nombre: this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      }),
<<<<<<< HEAD
      descripcion: this.fb.control('', { nonNullable: true }),
      ruta: this.fb.control('', { nonNullable: true }),
      estado: this.fb.control(true, { nonNullable: true }),
      stock: this.fb.control(0, { nonNullable: true }),
      precioVenta: this.fb.control(0, { nonNullable: true }),
      marca: this.fb.control(-1, { nonNullable: true }),
      categoria: this.fb.control(-1, { nonNullable: true }),
      medida: this.fb.control(0, { nonNullable: true }),
=======
      descripcion: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ruta: this.fb.control('', { nonNullable: true }),
      estado: this.fb.control(true, { nonNullable: true }),
      stock: this.fb.control<number | null>(null, {
        validators: [Validators.required],
      }),
      precioVenta: this.fb.control<number | null>(null, {
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
>>>>>>> origin/develop
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
