import { DIALOG_DATA } from '@angular/cdk/dialog';
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
};

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatIcon, MatButton],
  template: `
    <div class="min-w-xl max-w-3xl">
      <div class="p-6 text-gray-600">
        <div class="flex justify-center mb-4">
          <mat-icon color="primary">{{ data.icon ?? 'info' }}</mat-icon>
        </div>
        <h4 class="text-xl mb-4 text-center">
          {{ data.title ?? 'Confirmar' }}
        </h4>
        <p class="text-center">
          {{ data.message ?? '¿Estás seguro de realizar esta acción?' }}
        </p>
        <div class="flex justify-center gap-x-2 mt-6">
          <button (click)="onClosed(false)" mat-button color="primary">
            {{ data.cancel ?? 'Confirmar' }}
          </button>
          <button (click)="onClosed(true)" mat-raised-button color="primary">
            {{ data.accept ?? 'Cancelar' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  readonly data: DialogConfirmData = inject(DIALOG_DATA);

  onClosed(state: boolean) {
    this.dialogRef.close(state);
  }
}
