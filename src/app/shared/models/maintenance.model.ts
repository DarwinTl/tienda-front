/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  DestroyRef,
  Directive,
  inject,
  InjectionToken,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { delay, finalize, Observable, tap } from 'rxjs';

import { Inbox, InboxParam, Request } from '@shared/types/utilities.type';
import { DELAY_INBOX_MANINTENANCE } from '@shared/utils/const';

export const COLUMNS_DATA_TABLE = new InjectionToken<string[]>(
  'COLUMNS_DATA_TABLE',
);

export interface MaintenanceHandled {
  onLoadData(): void;
  changePage(): void;
}

export abstract class Repository<
  G = unknown,
  C = unknown,
  U = unknown,
  D = unknown,
> {
  abstract get(page: InboxParam): Observable<Inbox<G>>;
  abstract create(data: Request<any>): Observable<C>;
  abstract update(data: Request<any>): Observable<U>;
  abstract delete(id: number): Observable<D>;
}

@Directive()
export class Maintenance<T> implements OnInit, AfterViewInit {
  /**
   * @description Inject the columns to display in the data table
   */
  displayedColumns: string[] = inject(COLUMNS_DATA_TABLE);

  /**
   * @description Inject the dialog service
   */
  dialog = inject(MatDialog);

  /**
   * @description Inject the snackbar service
   */
  snackbar = inject(MatSnackBar);

  /**
   * @description Inject the destroy reference
   */
  destroyRef = inject(DestroyRef);

  /**
   * @description Inject the message service
   */
  msg = inject(MessageService);

  /**
   * @description Inject the router
   */
  router = inject(Router);

  /**
   * @description Inject the activated route
   */
  route = inject(ActivatedRoute);

  /**
   * @description Inject the paginator
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * @description Signal to handle the loading state
   */
  isLoadingDataTable = signal(false);

  /**
   * @description Data source for the data table
   */
  dataSource = new MatTableDataSource<T>();

  /**
   * @description Inject the repository
   */
  repository = inject(Repository);

  ngOnInit(): void {
    this.routesObservable();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.showFirstLastButtons = true;
    this.paginator.pageSizeOptions = [5, 10, 20, 50];
    this.paginator.pageSize = 5;
    this.changePage();
  }

  /**
   * @description Change the page in the paginator
   */
  changePage() {
    this.paginator.page
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(({ pageIndex, pageSize }) => {
          this.router.navigate([], {
            queryParams: { page: pageIndex, size: pageSize },
            relativeTo: this.route,
          });
        }),
      )
      .subscribe();
  }

  /**
   * @description Load the data from the repository
   * @param page number of the page to load
   * @returns void
   */
  onLoadData(params: InboxParam) {
    this.isLoadingDataTable.set(true);
    this.repository
      .get(params)
      .pipe(
        delay(DELAY_INBOX_MANINTENANCE),
        finalize(() => this.isLoadingDataTable.set(false)),
      )
      .subscribe({
        next: this.#hanldedLoadSuccess.bind(this),
        error: this.#hanldedLoadError.bind(this),
      });
  }

  /**
   * @description Handle the routes observable
   */
  routesObservable() {
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']);
      const size = Number(params['size']);
      if (!isNaN(page)) {
        this.onLoadData({ page, size });
      } else {
        this.router.navigate([], {
          queryParams: { page: 0, size: 5 },
          relativeTo: this.route,
        });
      }
    });
  }

  /**
   * @description Handled the success response from the repository
   * @param resp Response from the repository
   */
  #hanldedLoadSuccess(resp: Inbox<T>) {
    this.paginator.pageIndex = resp.currentPage;
    this.paginator.pageSize = resp.itemsPerPage;
    this.paginator.length = resp.totalElements;
    this.dataSource = new MatTableDataSource(resp.content);
  }

  #hanldedLoadError(error: unknown) {
    console.error('Error', error);
  }

  /**
   * @description Create a new register in the repository
   * @param data Payload to create
   */
  onCreate(data: any) {
    this.repository.create(data).subscribe({
      next: this.#handledCreateSuccess.bind(this),
      error: this.#handledCreateError.bind(this),
    });
  }

  #handledCreateSuccess() {
    this.msg.add({ severity: 'success', summary: 'Registro creado' });
    this.onLoadData({
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
    });
  }

  #handledCreateError() {
    this.msg.add({ severity: 'error', summary: 'Error al crear el registro' });
  }

  /**
   * @description Update a register in the repository
   * @param data Payload to update
   */
  onUpdate(data: any) {
    this.repository.update(data).subscribe({
      next: this.#handledUpdateSuccess.bind(this),
      error: this.#handledUpdateError.bind(this),
    });
  }

  #handledUpdateSuccess() {
    this.msg.add({ severity: 'success', summary: 'Registro actualizado' });
    this.onLoadData({
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
    });
  }

  #handledUpdateError() {
    this.msg.add({
      severity: 'error',
      summary: 'Error al actualizar el registro',
    });
  }

  /**
   * @description Delete a register in the repository
   * @param data Payload to delete
   */
  onDelete(data: any) {
    this.repository.delete(data).subscribe({
      next: this.#handledDeleteSuccess.bind(this),
      error: this.#handledDeleteError.bind(this),
    });
  }

  #handledDeleteSuccess() {
    this.msg.add({ severity: 'success', summary: 'Registro actualizado' });
    this.onLoadData({
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
    });
  }

  #handledDeleteError() {
    this.msg.add({ severity: 'error', summary: 'Error al crear el registro' });
  }
}
