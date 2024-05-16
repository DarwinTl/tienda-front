import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

import { ApiCategoriaAdapter } from '@api/adapters/api-categoria.adapter';
import {
  ConfirmDialogComponent,
  DialogConfirmData,
} from '@components/dialog/confirm/confirm.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { MaintenanceTableComponent } from '@components/ui/maintenance-table/maintenance-table.component';
import { ApiCategoria } from '@shared/api/service/api-categoria';
import { Maintenance } from '@shared/models/maintenance.model';
import {
  CategoriaField,
  CategoriesFormComponent,
} from './categories-form.component';
import { DataTableCategories } from './categories.type';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    TitleCasePipe,
    JsonPipe,
    MatPaginator,
    MatTable,
    MatButton,
    MatCheckbox,
    MatIcon,
    LoadingComponent,
    MaintenanceTableComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiCategoria],
  template: `
    <app-maintenance-table
      title="Categorías"
      [dataSource]="dataSource"
      [displayedColumns]="displayedColumns"
      [isLoading]="isLoadingDataTable()"
      (eventCreate)="openDialogCreate()"
      (eventChangeState)="onChangeState($event)"
      (eventEdit)="openDialogEdit($event)"
      (eventDelete)="openDialogDelete($event)"
    >
      <mat-paginator aria-label="Páginas de articulos" />
    </app-maintenance-table>
  `,
})
export class CategoriesComponent extends Maintenance<DataTableCategories> {
  onChangeState({
    state,
    checkboxRef,
  }: {
    state: boolean;
    checkboxRef: MatCheckbox;
  }) {
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
          // TODO: implementar el cambio de estado
        } else {
          checkboxRef.checked = state;
        }
      });
  }

  openDialogCreate() {
    const dialog = this.dialog.open(CategoriesFormComponent);
    dialog.afterClosed().subscribe((result) => {
      result && this.onCreate(ApiCategoriaAdapter.postCategoria(result));
    });
  }

  openDialogEdit(data: DataTableCategories) {
    this.dialog
      .open(CategoriesFormComponent, {
        data: {
          id: data.id,
          nombre: data.nombre,
          detalle: data.detalle,
        } as CategoriaField,
      })
      .afterClosed()
      .subscribe((result) => {
        result && this.onUpdate(ApiCategoriaAdapter.putCategoria(result));
      });
  }

  openDialogDelete(data: DataTableCategories) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Eliminar categoría',
          message: `¿Estás seguro de eliminar la categoría ${data.nombre ?? '-'}?`,
          icon: 'warning',
          accept: 'Cancelar',
          cancel: 'Elminar',
          iconColor: 'tw-text-red-500'
        } as DialogConfirmData,
      })
      .afterClosed()
      .subscribe((result) => {
        !result && this.onDelete(data.id);
      });
  }
}
