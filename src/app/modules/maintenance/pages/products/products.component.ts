import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ConfirmDialogComponent } from '@components/dialog/confirm/confirm.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { MaintenanceTableComponent } from '@components/ui/maintenance-table/maintenance-table.component';
import { Maintenance } from '@shared/models/maintenance.model';
import { DataTableMarcas } from '../marcas/marcas.type';
import { ProductsFormComponent } from './products-form.component';
import { DataTableProducts } from './products.type';

@Component({
  selector: 'app-products',
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
      title="Productos"
      [dataSource]="dataSource"
      [displayedColumns]="displayedColumns"
      [isLoading]="isLoadingDataTable()"
      (eventCreate)="openDialogCreate()"
      (eventChangeState)="onChangeState($event)"
      (eventEdit)="openDialogEdit($event)"
      (eventDelete)="openDialogDelete($event)"
    >
      <mat-paginator class="bg-white" aria-label="Páginas de productos" />
    </app-maintenance-table>
  `,
})
export class ProductsComponent extends Maintenance<DataTableProducts> {
  openDialogCreate() {
    this.dialog
      .open(ProductsFormComponent)
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;
        const data = new FormData();
        data.append('categoria', result.categoria);
        data.append('descripcion', result.descripcion);
        data.append('estado', `${result.estado ? 1 : 0}`);
        data.append('marca', result.marca);
        data.append('nombre', result.nombre);
        data.append('precioVenta', result.precioVenta);
        data.append('stock', result.stock);
        data.append('foto', result.ruta);
        this.onCreate(data);
      });
  }

  openDialogEdit(data: DataTableMarcas) {
    this.dialog
      .open(ProductsFormComponent, {
        data: {
          ...data,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;
        const data = new FormData();
        data.append('id', result.id);
        data.append('categoria', result.categoria);
        data.append('descripcion', result.descripcion);
        data.append('estado', `${result.estado ? 1 : 0}`);
        data.append('marca', result.marca);
        data.append('nombre', result.nombre);
        data.append('precioVenta', result.precioVenta);
        data.append('stock', result.stock);
        data.append('foto', result.ruta);
        this.onUpdate(data);
      });
  }

  openDialogDelete(data: DataTableMarcas) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          id: data.id,
        },
      })
      .afterClosed()
      .subscribe((result) => {
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
