import { DIALOG_DATA } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

export type DialogConfirmData = {
  title?: string;
  message?: string;
  icon?: string;
  accept?: string;
  cancel?: string;
  iconColor?: string;
};

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [NgClass, MatIcon, MatButton],
  template: `
    <div class="tw-min-w-xl tw-max-w-3xl">
      <div class="tw-p-6 tw-text-gray-600">
        <div class="tw-flex tw-justify-center tw-mb-4">
          <mat-icon style="height: 40px !important; width: 40px; !important" class="tw-text-4xl" [ngClass]="[data.iconColor ?? 'tw-text-blue-950']">{{ data.icon ?? 'info' }}</mat-icon>
        </div>
        <h4 class="tw-text-xl tw-mb-4 tw-text-center">
          {{ data.title ?? 'Confirmar' }}
        </h4>
        <p class="tw-text-center">
          {{ data.message ?? '¿Estás seguro de realizar esta acción?' }}
        </p>
        <div class="tw-flex tw-justify-center tw-gap-x-2 tw-mt-6">
          <button class="tw-grow" (click)="onClosed(false)" mat-stroked-button color="primary">
            {{ data.cancel ?? 'Confirmar' }}
          </button>
          <button class="tw-grow" (click)="onClosed(true)" mat-raised-button color="primary">
            {{ data.accept ?? 'Cancelar' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  readonly data: DialogConfirmData = inject(DIALOG_DATA);

  onClosed(state: boolean) {
    this.dialogRef.close(state);
  }
}
