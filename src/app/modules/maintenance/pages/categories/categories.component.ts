import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ConfirmDialogComponent,
  DialogConfirmData,
} from '@components/dialog/confirm/confirm.component';
import { ApiCategoria } from 'src/app/shared/api/service/api.categoria';
import { DataTableCategories } from './categories.type';
import {
  FormCategorieComponent,
  NuevoRegistroField,
} from './form-categorie.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [ApiCategoria],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'estado',
    'acciones',
  ];
  dataSource: MatTableDataSource<DataTableCategories>;
  data: DataTableCategories[] = [
    {
      id: 1,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 2,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 3,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 4,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 5,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: false,
    },
    {
      id: 6,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 7,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 8,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 9,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 10,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 11,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 12,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: false,
    },
    {
      id: 13,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 14,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 15,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 16,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 17,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 18,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 19,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 20,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 21,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 22,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 23,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 24,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 25,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 26,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 27,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 28,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 29,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
    {
      id: 30,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la categoría 1',
      estado: true,
    },
  ];

  dialog = inject(MatDialog);
  apiCategoria = inject(ApiCategoria);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onChangeState(state: boolean, checkboxRef: MatCheckbox) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Cambiar estado',
          message: '¿Estás seguro de cambiar el estado de la categoría?',
          icon: 'info',
          accept: 'Cambiar',
          cancel: 'Cancelar',
        } as DialogConfirmData,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log('Cambiar estado');
        } else {
          checkboxRef.checked = state;
        }
      });
  }

  openDialogCreate() {
    this.dialog.open(FormCategorieComponent);
  }

  openDialogEdit(data: DataTableCategories) {
    this.dialog.open(FormCategorieComponent, {
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      } as NuevoRegistroField,
    });
  }
}
