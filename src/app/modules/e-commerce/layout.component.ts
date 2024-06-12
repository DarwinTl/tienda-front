import { Component, effect, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatMenu } from '@angular/material/menu';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav'; // For compatibility with older Angular Material versions
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MainContainerComponent } from '@components/main-container/main-container.component';
import { FooterComponent } from '@components/ui/footer/footer.component';
import { SidebarShopItemsComponent } from '@components/ui/sidebar-shop-items/sidebar-shop-items.component';
import { AuthStore } from '@shared/store/auth.store';
import { MenuStore } from '@shared/store/menu.store';
import { ShopStore } from '@shared/store/shop.store';
import { CabeceraComponent } from '../../shared/components/cabecera/cabecera.component';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    MatMenu,
    MatList,
    MatListItem,
    MatNavList,
    MatDrawer,
    MatDrawerContainer,
    MatBadge,
    MatIcon,
    MatDrawerContent,
    RouterOutlet,
    MatToolbar,
    MatButton,
    MatFormField,
    MainContainerComponent,
    RouterLink,
    RouterLinkActive,
    CabeceraComponent,
    FooterComponent,
    SidebarShopItemsComponent,
  ],
  template: `
    <div class="root-ecommerce">
      <app-cabecera
        class="header-ecommerce"
        (menuEvent)="drawer.toggle()"
        (shopCartEvent)="sidebar.toggleSidebar()"
      />

      <mat-drawer-container autosize class="container-ecommerce">
        <mat-drawer #drawer opened="true" mode="side" position="start">
          <mat-nav-list>
            @for (categoria of menuStore.categorias(); track categoria) {
              <mat-list-item
                [routerLink]="['categoria', categoria.ruta]"
                [activated]="routerLink.isActive"
              >
                <a
                  #routerLink="routerLinkActive"
                  routerLinkActive="active"
                  [routerLink]="['categoria', categoria.ruta]"
                  class="tw-flex tw-items-center tw-gap-2"
                >
                  <img
                    [src]="'assets/imagenes/' + categoria.icono"
                    alt="Icono"
                    width="20"
                    height="20"
                  />
                  <span>
                    {{ categoria.nombre }}
                  </span>
                </a>
              </mat-list-item>
            }
          </mat-nav-list>
        </mat-drawer>
        <mat-drawer-content class="content-ecommerce">
          <div class="main-ecommerce">
            <router-outlet></router-outlet>
          </div>
        </mat-drawer-content>
      </mat-drawer-container>
      <app-footer class="footer-ecommerce" />
      <app-sidebar-shop-items #sidebar />
    </div>
  `,
})
export class LayoutComponent {
  menuStore = inject(MenuStore);
  authSore = inject(AuthStore);
  shopStore = inject(ShopStore);

  constructor() {
    effect(
      () => {
        if (this.authSore.isLogged()) {
          this.shopStore.obtenerCarrito();
          console.log('Usuario logueado');
        } else {
          this.shopStore.limpiarCarrito();
          console.log('Usuario No logueado');
        }
      },
      { allowSignalWrites: true },
    );
  }
}
