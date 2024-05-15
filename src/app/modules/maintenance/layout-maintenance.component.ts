import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatListItemIcon } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { BreakpointObserver } from '@angular/cdk/layout';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MainContainerComponent } from '@components/main-container/main-container.component';
import { AuthStore } from '@shared/store/auth.store';
import { MaintenanceRoutes } from './layout.routes';

@Component({
  selector: 'app-layout-maintenance',
  standalone: true,
  imports: [
    MainContainerComponent,
    MatList,
    MatListItem,
    MatListItemIcon,
    MatIcon,
    MatButton,
    MatIconButton,
    MatToolbar,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  template: `
    <div class="maintenance-root">
      <header class="maintenance-header shadow-sm bg-white">
        <mat-toolbar class="shadow-md">
          <div class="flex items-center max-w-5xl grow mx-auto">
            @if (smallScreen()) {
              <button
                (click)="openSidenav()"
                class="justify-start"
                mat-icon-button
              >
                <mat-icon>menu</mat-icon>
              </button>
            }
            <!-- <div class="flex items-center justify-start">
              <h4 class="text-md md:text-2xl">Mantenimiento</h4>
            </div> -->
            <span class="grow"></span>
            <button
              class="justify-end"
              (click)="logout()"
              type="button"
              mat-stroked-button
              color="primary"
            >
              <mat-icon color="error">logout</mat-icon>
              Cerrar sesión
            </button>
          </div>
        </mat-toolbar>
      </header>
      <mat-drawer-container class="main">
        <mat-drawer
          [mode]="smallScreen() ? 'over' : 'side'"
          [opened]="sideNav()"
          (closedStart)="smallScreen() && sideNav.set(false)"
        >
          <div class="maintenance-sidebar">
            <mat-list>
              <div class="flex justify-center">
                <img
                  class="w-40 h-40"
                  src="assets/imagenes/logo.png"
                  alt="logo"
                />
              </div>
              <h3 mat-subheader class="text-gray-600">General</h3>
              @for (opcion of opciones; track opcion) {
                <mat-list-item
                  class="nav-item"
                  [routerLink]="opcion.link"
                  (isActiveChange)="smallScreen() && sideNav.set(false)"
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
        </mat-drawer>

        <mat-drawer-content>
          <main>
            <app-main-container>
              <router-outlet />
            </app-main-container>
          </main>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout-maintenance.component.scss',
})
export class LayoutMaintenanceComponent {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  authStore = inject(AuthStore);
  breakpoint = inject(BreakpointObserver);

  sideNav = signal(false);
  smallScreen = signal(false);

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

  constructor() {
    this.breakpoint.observe('(max-width: 768px)').subscribe((state) => {
      if (state.matches) {
        this.smallScreen.set(true);
        this.sideNav.set(false);
      } else {
        this.sideNav.set(true);
        this.smallScreen.set(false);
      }
    });
  }

  openSidenav() {
    this.sideNav.update((value) => !value);
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/']);
  }
}
