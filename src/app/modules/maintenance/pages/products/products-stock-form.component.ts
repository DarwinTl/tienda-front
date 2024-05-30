import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { Producto } from './products.type';

@Component({
  selector: 'app-products-stock-form',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatButton,
    MatIconButton,
    MatDialogModule,
    CurrencyPipe,
    OnlyNumbersDirective,
  ],
  template: `
    <div class="tw-max-w-xl">
      <div class="tw-p-8">
        <h4 class="tw-text-xl tw-mb-4">Actualizar stock</h4>
        <form class="tw-flex tw-flex-col tw-gap-4 tw-items-center">
          <mat-form-field>
            <mat-label>Stock</mat-label>
            <input
              class="tw-text-end"
              [value]="data.stock"
              matInput
              disabled
              placeholder="0"
              type="number"
            />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Nuevo stock</mat-label>
            <input
              class="tw-text-end"
              [value]="nuevaCantidad()"
              matInput
              disabled
              placeholder="0"
              type="number"
            />
          </mat-form-field>
          <div
            class="tw-flex tw-gap-2 tw-items-center tw-justify-center tw-max-w-48"
          >
            <button (click)="sustract()" type="button" mat-icon-button>
              <mat-icon>remove</mat-icon>
            </button>
            <div>
              <input
                appOnlyNumbers
                (input)="changeInput($event)"
                [value]="cantidad()"
                class="custom-input tw-text-center"
              />
            </div>
            <button (click)="add()" type="button" mat-icon-button>
              <mat-icon>add</mat-icon>
            </button>
          </div>

          <div class="tw-flex tw-gap-4 tw-justify-center">
            <button
              type="button"
              mat-stroked-button
              color="primary"
              mat-dialog-close
            >
              Cancelar
            </button>
            <button
              type="button"
              mat-raised-button
              color="primary"
              [disabled]="cantidad() === 0"
              (click)="guardar()"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductsStockFormComponent {
  private readonly dialogRef = inject(MatDialogRef);
  data: Producto = inject(DIALOG_DATA);

  cantidad = signal(0);
  nuevaCantidad = computed(() => this.cantidad() + this.data.stock);

  add() {
    this.cantidad.update((prev) => ++prev);
  }

  sustract() {
    if (this.cantidad() === 0) return;
    this.cantidad.update((prev) => --prev);
  }

  changeInput(event: Event) {
    console.log({ event });
    const value = (event.target as HTMLInputElement).value;
    this.cantidad.set(Number(value));
  }

  guardar() {
    this.dialogRef.close(this.cantidad());
  }
}
