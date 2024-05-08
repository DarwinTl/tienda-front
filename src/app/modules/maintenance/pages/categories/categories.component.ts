import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
import { LoadingComponent } from '@components/loading/loading.component';
import { delay, finalize, tap } from 'rxjs';
import { ApiCategoria } from 'src/app/shared/api/service/api.categoria';
import { DataTableCategories } from './categories.type';
import {
  CategoriaField,
  FormCategorieComponent,
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
    LoadingComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiCategoria],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'detalle',
    // 'descripcion',
    // 'estado',
    'acciones',
  ];
  dataSource: MatTableDataSource<DataTableCategories>;

  dialog = inject(MatDialog);
  apiCategoria = inject(ApiCategoria);
  destroyRef = inject(DestroyRef);

  isLoading = signal(false);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.onLoadInbox();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.changePage();
  }

  changePage() {
    this.paginator.page.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => this.onLoadInbox(this.paginator.pageIndex)),
    ).subscribe();
  }

  onLoadInbox(page: number = 0) {
    this.isLoading.set(true);
    this.apiCategoria.getCategories(page).pipe( 
      delay(1000),
      finalize(() => this.isLoading.set(false))).subscribe({
      next: (resp) => {
        console.log({ resp });
        this.paginator.pageSize = resp.itemsPerPage;
        this.paginator.length = resp.totalElements;
        this.dataSource = new MatTableDataSource(resp.content);
      },
      error: (error) => {
        console.error({ error });
      },
    });
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
    const dialog = this.dialog.open(FormCategorieComponent);
    dialog.afterClosed().subscribe(result => {
      console.log({ result});
      this.handledCreate(result);
    })
  }

  handledCreate(payload: CategoriaField) {
    this.apiCategoria.createCategory({ detalle: payload.nombre }).subscribe({
      next: (resp) => {
        console.log({ resp });
      },
      error: (error) => {
        console.error({ error });
      },
    });
  } 

  openDialogEdit(data: DataTableCategories) {
    this.dialog.open(FormCategorieComponent, {
      data: {
        nombre: data.detalle,
        descripcion: '',
      } as CategoriaField,
    }).afterClosed().subscribe(result => {
      console.log({ result });
      this.handledEdit(data.id, result);
    }
    );
  }

  handledEdit(id: number, payload: CategoriaField) {
    this.apiCategoria.updateCategory(id, { detalle: payload.nombre, id }).subscribe({
      next: () => {
        this.onLoadInbox(this.paginator.pageIndex)
      },
      error: (error) => {
        console.error({ error });
      },
    });
  }
}
