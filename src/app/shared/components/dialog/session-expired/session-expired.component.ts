import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-session-expired',
  standalone: true,
  imports: [MatIcon],
  template: `
  
    <div class="min-w-md md:max-w-3xl">
      <div class="p-6">
        <div class="flex justify-center mb-4">
          <mat-icon color="primary">info</mat-icon>
        </div>
        <h4 class="text-xl mb-4 text-center">
          Sesión expirada
        </h4>
        <p class="text-center">
          Tu sesión ha expirado, por favor inicia sesión nuevamente.
        </p>
        <div class="flex justify-center gap-x-2 mt-6">
          <button mat-raised-button color="primary" routerLink="/autenticacion/login">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>

  `,
  styleUrl: './session-expired.component.scss'
})
export class SessionExpiredComponent {}
