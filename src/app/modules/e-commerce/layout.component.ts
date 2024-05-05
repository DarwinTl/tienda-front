import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterOutlet],
  template: `
    <header>
      <mat-toolbar>
        <button
          type="menu"
          mat-icon-button
          class="flex mr-2"
          aria-label="Example icon-button with menu icon"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>Market Don Pepe</span>
      </mat-toolbar>
    </header>
    <router-outlet />
  `,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
