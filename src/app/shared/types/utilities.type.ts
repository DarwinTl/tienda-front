import { AbstractControl } from '@angular/forms';

export type CustomAbstractControl<T> = {
  [K in keyof T]: AbstractControl<T[K]>;
};

export type ResponseInbox<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type Inbox<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  lastPage: boolean;
  firstPage: boolean;
  itemsPerPage: number;
};

export interface Request<T> {
  [key: string]: T;
}

export type InboxParam = {
  page: number;
  size: number;
};
