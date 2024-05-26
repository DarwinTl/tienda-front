import { Component, OnInit } from '@angular/core';
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
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MainContainerComponent } from '@components/main-container/main-container.component';
import { FooterComponent } from '@components/ui/footer/footer.component';
import { SidebarShopItemsComponent } from '@components/ui/sidebar-shop-items/sidebar-shop-items.component';
import { ApiError } from '@shared/models/error.model';
import { CabeceraComponent } from '../../shared/components/cabecera/cabecera.component';
import { ecommerceService } from './e-commerce.service';
import { categoria_product_list } from './pages/inicio/Inicio.type';

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

      <mat-drawer-container autosize class="content-ecommerce">
        <mat-drawer #drawer opened="true" mode="side" position="start">
          <mat-nav-list>
            @for (categoria of categorias; track categoria) {
              <mat-list-item
                routerLinkActive="active"
                [routerLink]="['/cuerpo', { parametro: categoria.id }]"
              >
                <div class="tw-flex tw-items-center tw-gap-2">
                  <img
                    [src]="'assets/imagenes/' + categoria.icono"
                    alt="Icono"
                    width="20"
                    height="20"
                  />
                  <span>
                    {{ categoria.nombre }}
                  </span>
                </div>
              </mat-list-item>
            }
          </mat-nav-list>
        </mat-drawer>
        <mat-drawer-content>
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
export class LayoutComponent implements OnInit {
  categorias: categoria_product_list[] = [];

  constructor(
    private route: ActivatedRoute,
    private _ecommerceService: ecommerceService,
  ) {
    this.route.params.subscribe((params) => {
      const parametro = params['parametro'];
      console.log(parametro);
    });
  }

  ngOnInit(): void {
    this.fngeCatList();
  }

  fngeCatList() {
    this._ecommerceService.getCategories().subscribe({
      next: (res) => {
        this.categorias = res;
      },
      error: (e: ApiError) => {
        console.log('Error :', e);
      },
    });
  }
}
