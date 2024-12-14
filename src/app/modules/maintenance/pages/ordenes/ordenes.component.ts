import { ChangeDetectorRef, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiOrden } from '@api/service/api-orden';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ORDENES_COLUMNS_DATA_TABLE } from './ordenes.const';
import { GetOrden } from '@api/interface/api-orden.interface';
import { LoadingComponent } from '@components/loading/loading.component';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiError } from '@shared/models/error.model';
import { debounceTime, delay, finalize } from 'rxjs';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [
    MatPaginator,
    LoadingComponent,
    MatTableModule,
    CurrencyPipe,
    TitleCasePipe,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    ReactiveFormsModule
  ],
  template: `
    <section class="tw-p-4">
      <h3 class="tw-text-gray-700 tw-text-2xl">Ordenes</h3>
    </section>
    <section class="tw-p-4">
      <mat-form-field class="tw-block tw-max-w-[50%] tw-mb-4">
        <input [formControl]="searchControl" matInput class="tw-w-full tw-uppercase" type="text" placeholder="Búsqueda N° de boleta" />
      </mat-form-field>
      <app-loading [isLoading]="isLoadingDataTable()" [diameter]="50">
        <table mat-table [dataSource]="dataSource">
          @for (data of columns; track data) {
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
                @if (data === 'acciones') {
                  <div class="tw-flex tw-justify-center">
                    @if (cell['estado'] === 'Corroborando pago') {
                      <button
                        color="primary"
                        mat-raised-button
                        (click)="aprobarOrden(cell)"
                      >
                        Aprobar pago
                      </button>
                    } @else if (cell['estado'] === 'confirmado') {
                      <button
                        mat-raised-button
                        color="primary"
                        (click)="prepararOrden(cell)"
                      >
                        Preparar envío
                      </button>
                    }
                  </div>
                } @else if (data === 'total') {
                  {{ cell[data] | currency : 'S/' }}
                } @else { 
                  {{ cell[data] }}
                }
              </td>
            </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns"></tr>
        </table>
        <mat-paginator aria-label="Páginas de articulos" />
      </app-loading>
    </section>
  `,
  styles: []
})
export class OrdenesComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  fb = inject(FormBuilder);
  cRef = inject(ChangeDetectorRef);
  apiOrden = inject(ApiOrden);
  dataSource = new MatTableDataSource<GetOrden>();
  columns = ORDENES_COLUMNS_DATA_TABLE;
  isLoadingDataTable = signal(false);

  searchControl = this.fb.control('', { nonNullable: true});

  ngOnInit(): void {
    this.#loadOrdenes();  
    this.search();
  }

  #loadOrdenes() {
    this.isLoadingDataTable.set(true);
    this.apiOrden.getOrdenes().pipe(finalize(() =>this.isLoadingDataTable.set(false))).subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource<GetOrden>(value);
        this.cRef.detectChanges()
      }
    })
  }

  search() {
    this.searchControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      if (value === '') {
        this.#loadOrdenes();
      } else {
        this.buscarBoleta(value);
      }
    });
  }

  aprobarOrden(orden: GetOrden) {
    this.isLoadingDataTable.set(true);
    const { numeroBoleta } = orden; 
    this.apiOrden.aporbarOrden(numeroBoleta).pipe(finalize(() => this.isLoadingDataTable.set(false))).subscribe({
      next: () => {
        this.#loadOrdenes();
      },
      error: (error: ApiError) => {
        console.log({ error });
      }
    })
  }

  prepararOrden(orden: GetOrden) {
    this.isLoadingDataTable.set(true);
    const {numeroBoleta} = orden;
    this.apiOrden.prepararOrden(numeroBoleta).pipe(finalize(() => this.isLoadingDataTable.set(false))).subscribe({
      next: () => {
        this.#loadOrdenes();
      },
      error: (error: ApiError) => {
        console.log({error});
      }
    })
  }

  buscarBoleta(nroBoleta: string) {
    this.isLoadingDataTable.set(true);
    this.apiOrden.buscarNumeroBoleta(nroBoleta).pipe(delay(1000), finalize(() => this.isLoadingDataTable.set(false))).subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource<GetOrden>([value]);
      },
      error: (error: ApiError) => {
        console.log({error});
      }
    })
  }
}
