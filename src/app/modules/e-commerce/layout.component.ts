import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButton,
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <header>
      <mat-toolbar class="justify-between">
        <div class="grow flex gap-x-2">
          <button
            type="menu"
            mat-icon-button
            class="flex mr-2"
            aria-label="Example icon-button with menu icon"
          >
            <mat-icon>menu</mat-icon>
          </button>
          <span>Market Don Pepe</span>
        </div>
        <div class="mr-8">
          <button routerLink="login" class="" mat-raised-button color="primary">
            Ingresar
          </button>
        </div>
      </mat-toolbar>
    </header>
    <router-outlet />
  `,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
