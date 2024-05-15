import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {
  ConfirmDialogComponent,
  DialogConfirmData,
} from '@components/dialog/confirm/confirm.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { MaintenanceTableComponent } from '@components/ui/maintenance-table/maintenance-table.component';
import { Maintenance } from '@shared/models/maintenance.model';
import { MarcasFormComponent } from './marcas-form.component';
import { DataTableMarcas } from './marcas.type';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatPaginator,
    MatTable,
    MatButton,
    MatCheckbox,
    MatIcon,
    LoadingComponent,
    MaintenanceTableComponent,
  ],
  template: `
    <app-maintenance-table
      title="Marcas"
      [dataSource]="dataSource"
      [displayedColumns]="displayedColumns"
      [isLoading]="isLoadingDataTable()"
      (eventCreate)="openDialogCreate()"
      (eventChangeState)="onChangeState($event)"
      (eventEdit)="openDialogEdit($event)"
      (eventDelete)="openDialogDelete($event)"
    >
      <mat-paginator class="bg-white" aria-label="Páginas de articulos" />
    </app-maintenance-table>
  `,
})
export class MarcasComponent extends Maintenance<DataTableMarcas> {
  openDialogCreate() {
    const dialog = this.dialog.open(MarcasFormComponent);
    dialog.afterClosed().subscribe((result) => {
      result && this.onCreate(result);
    });
  }

  openDialogEdit(data: DataTableMarcas) {
    const dialog = this.dialog.open(MarcasFormComponent, {
      data: {
        id: data.id,
        nombre: data.nombre,
        detalle: data.detalle,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      result && this.onUpdate(result);
    });
  }

  openDialogDelete(data: DataTableMarcas) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar marca',
        message: `¿Estás seguro de eliminar la marca ${data.nombre}?`,
        icon: 'warning',
        accept: 'Cancelar',
        cancel: 'Eliminar',
      } as DialogConfirmData,
    });
    dialog.afterClosed().subscribe((result) => {
      !result && this.onDelete(data.id);
    });
  }
  onChangeState({
    state,
    checkboxRef,
  }: {
    state: boolean;
    checkboxRef: MatCheckbox;
  }) {
    console.log({ state, checkboxRef });
  }
}
