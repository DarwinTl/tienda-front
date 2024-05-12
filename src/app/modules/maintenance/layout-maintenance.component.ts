import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { MainContainerComponent } from '@components/main-container/main-container.component';
import { AuthStore } from '@shared/store/auth.store';
import { MaintenanceRoutes } from './layout.routes';

@Component({
  selector: 'app-layout-maintenance',
  standalone: true,
  imports: [
    MainContainerComponent,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  template: `
    <div class="maintenance-root">
      <div class="maintenance-sidebar">
        <mat-list>
          <div class="flex justify-center">
            <img class="w-40 h-40" src="assets/imagenes/logo.png" alt="logo" />
          </div>
          <h3 mat-subheader class="text-gray-600">General</h3>
          @for (opcion of opciones; track opcion) {
            <mat-list-item
              class="nav-item"
              [routerLink]="opcion.link"
              routerLinkActive="active"
            >
              <div class="flex gap-x-2 text-gray-600">
                <mat-icon mat-list-icon>{{ opcion.icon }}</mat-icon>
                <h4>{{ opcion.title }}</h4>
              </div>
            </mat-list-item>
          }
        </mat-list>
      </div>
      <header class="maintenance-header">
        <mat-toolbar class="shadow-md bg-white">
          <div class="flex max-w-5xl grow justify-end mx-auto">
            <button (click)="logout()" type="button" mat-button color="primary">
              Cerrar sesión
            </button>
          </div>
        </mat-toolbar>
      </header>
      <main>
        <app-main-container>
          <router-outlet />
        </app-main-container>
      </main>
    </div>
  `,
  styleUrl: './layout-maintenance.component.scss',
})
export class LayoutMaintenanceComponent {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  authStore = inject(AuthStore);

  opciones: { title: string; icon: string; link: string }[] = [
    {
      title: 'Categorías',
      icon: 'fact_check',
      link: MaintenanceRoutes.CATEGORIAS,
    },
    {
      title: 'Marcas',
      icon: 'fact_check',
      link: MaintenanceRoutes.MARCAS,
    },
    {
      title: 'Productos',
      icon: 'fact_check',
      link: MaintenanceRoutes.PRODUCTOS,
    },
    {
      title: 'Unidad de Medida',
      icon: 'fact_check',
      link: MaintenanceRoutes.UNIDADES,
    },
  ];

  logout() {
    this.authStore.logout();
    this.router.navigate(['/']);
  }
}
