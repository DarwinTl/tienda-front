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
import { DataTableUnidadMedida } from './unidad.type';
import { UnidadesFormComponent } from './unidades-form.component';

@Component({
  selector: 'app-unidades',
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
      title="Unidad de medida"
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
  styles: ``,
})
export class UnidadesComponent extends Maintenance<DataTableUnidadMedida> {
  openDialogCreate() {
    const dialog = this.dialog.open(UnidadesFormComponent);
    dialog.afterClosed().subscribe((result) => {
      result && this.onCreate(result);
    });
  }

  openDialogEdit(data: DataTableUnidadMedida) {
    const dialog = this.dialog.open(UnidadesFormComponent, {
      data: {
        id: data.id,
        detalle: data.descripcion,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      result && this.onUpdate(result);
    });
  }

  openDialogDelete(data: DataTableUnidadMedida) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar unidad de medida',
        message: `¿Estás seguro de eliminar la unidad de medida ${data.descripcion}?`,
        icon: 'warning',
        accept: 'Cancelar',
        cancel: 'Eliminar',
        iconColor: 'tw-text-red-500',
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
