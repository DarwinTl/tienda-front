import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-session-expired',
  standalone: true,
  imports: [MatIcon, MatButton, MatDialogClose],
  template: `
  
    <div class="tw-min-w-md md:tw-max-w-3xl">
      <div class="tw-p-6">
        <div class="tw-flex tw-justify-center tw-mb-4">
          <mat-icon color="primary">info</mat-icon>
        </div>
        <h4 class="tw-text-xl tw-mb-4 tw-text-center">
          Sesión expirada
        </h4>
        <p class="tw-text-center">
          Tu sesión ha expirado, por favor inicia sesión nuevamente.
        </p>
        <div class="tw-flex tw-justify-center tw-gap-x-2 tw-mt-6">
          <button mat-raised-button color="primary" mat-dialog-close>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>

  `,
})
export class SessionExpiredComponent {}
