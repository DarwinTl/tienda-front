/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { LoadingComponent } from '@components/loading/loading.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-maintenance-table',
  standalone: true,
  imports: [
    TitleCasePipe,
    JsonPipe,
    MatPaginator,
    MatTable,
    MatIconButton,
    MatButton,
    MatCheckbox,
    MatIcon,
    LoadingComponent,
    ToastModule,
    MatTableModule,
  ],
  template: `
    <section class="tw-p-4">
      <h3 class="tw-text-gray-700 tw-text-2xl">{{ title }}</h3>
      <div class="tw-flex tw-justify-end tw-w-full tw-py-4">
        <button
          type="button"
          aria-label="Nuevo registro"
          mat-raised-button
          color="primary"
          (click)="eventCreate.emit()"
        >
          Nuevo
        </button>
      </div>
    </section>

    <section class="tw-p-4">
      <app-loading [isLoading]="isLoading" [diameter]="50">
        <table mat-table [dataSource]="dataSource">
          @for (data of displayedColumns; track data) {
            <ng-container [matColumnDef]="data">
              <th mat-header-cell *matHeaderCellDef>
                @if (data === 'acciones') {
                  <div class="tw-text-center">
                    {{ data | titlecase }}
                  </div>
                } @else {
                  {{ data | titlecase }}
                }
              </th>
              <td mat-cell *matCellDef="let cell">
                @if (data === 'estado') {
                  <mat-checkbox
                    #ref
                    (click)="
                      eventChangeState.emit({
                        state: cell[data],
                        checkboxRef: ref
                      })
                    "
                    [checked]="cell[data]"
                    color="primary"
                  ></mat-checkbox>
                } @else if (data === 'acciones') {
                  <div class="tw-flex tw-justify-center">
                    <button
                      color="primary"
                      mat-icon-button
                      (click)="eventEdit.emit(cell)"
                    >
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button
                      mat-icon-button
                      color="warn"
                      (click)="eventDelete.emit(cell)"
                    >
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                } @else {
                  {{ cell[data] }}
                }
              </td>
            </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
        <ng-content></ng-content>
      </app-loading>
    </section>
  `,
  styles: ``,
})
export class MaintenanceTableComponent {
  @Input()
  displayedColumns: string[] = [];

  @Input()
  isLoading: boolean = false;

  @Input({ required: true })
  dataSource!: MatTableDataSource<any>;

  @Input({ required: true })
  title!: string;

  @Output()
  eventCreate = new EventEmitter<void>();

  @Output()
  eventEdit = new EventEmitter<any>();

  @Output()
  eventDelete = new EventEmitter<any>();

  @Output()
  eventChangeState = new EventEmitter<{
    state: boolean;
    checkboxRef: MatCheckbox;
  }>();
}
