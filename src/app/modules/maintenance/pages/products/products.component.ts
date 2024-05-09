import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { LoadingComponent } from '@components/loading/loading.component';
import { MaintenanceTableComponent } from '@components/ui/maintenance-table/maintenance-table.component';
import { Maintenance } from '@shared/models/maintenance.model';
import { DataTableMarcas } from '../marcas/marcas.type';
import { DataTableProducts } from './products.type';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
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
      <mat-paginator aria-label="Páginas de productos" />
    </app-maintenance-table>
  `,
})
export class ProductsComponent extends Maintenance<DataTableProducts> {
  openDialogCreate() {
    throw new Error('Method not implemented.');
  }

  openDialogEdit($event: DataTableMarcas) {
    throw new Error('Method not implemented.');
  }

  openDialogDelete($event: DataTableMarcas) {
    throw new Error('Method not implemented.');
  }
  onChangeState({
    state,
    checkboxRef,
  }: {
    state: boolean;
    checkboxRef: MatCheckbox;
  }) {
    throw new Error('Method not implemented.');
  }
}
