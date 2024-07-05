import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopButtonComponent } from '@components/shop-button/shop-button.component';
import { ShopStore } from '@shared/store/shop.store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar-shop-items',
  standalone: true,
  imports: [
    CurrencyPipe,
    SidebarModule,
    CardModule,
    ShopButtonComponent,
    ButtonModule,
    RouterLink,
  ],
  template: `
    <p-sidebar
      position="right"
      [(visible)]="visibility"
      styleClass="tw-w-[26rem] tw-h-full"
    >
      <div class="flex tw-justify-between tw-flex-col tw-h-full">
        <div class="tw-p-8">
          <div class="tw-flex tw-items-center tw-flex-col tw-mb-6">
            <h3 class="tw-text-2xl tw-mb-1">Carrito</h3>
            <h4>Tienes {{ shopStore.entities().length }} items</h4>
          </div>
          <div class="tw-flex tw-h-full tw-justify-between tw-flex-col">
            <div class="tw-grid tw-gap-4">
              @for (item of shopStore.entities(); track item) {
                <p-card>
                  <div class="tw-flex tw-gap-4">
                    <img
                      class="tw-w-24 tw-h-24 tw-object-cover tw-rounded-lg tw-shadow-sm tw-p-1"
                      [src]="item.ruta"
                      [alt]="item.nombre"
                    />
                    <div class="tw-flex tw-flex-col">
                      <div
                        class="tw-flex tw-items-center tw-justify-between tw-mb-3"
                      >
                        <h4>{{ item.nombre }}</h4>
                        <span>{{
                          item.precioVenta * item.cantidad
                            | currency: 'S/' : 'symbol' : '1.2-2'
                        }}</span>
                      </div>
                      <app-shop-button [entity]="item" />
                    </div>
                  </div>
                </p-card>
              }
            </div>
          </div>
        </div>
        <p-card class="tw-p-4 tw-shadow-md">
          <div class="tw-grid tw-gap-4 tw-pb-4">
            <div class="tw-flex tw-justify-between tw-font-semibold">
              <p>Total</p>
              <p>
                {{
                  shopStore.totalCompra() | currency: 'S/' : 'symbol' : '1.2-2'
                }}
              </p>
            </div>
          </div>
          @if (shopStore.entities().length) {
            <p-button
              severity="danger"
              label="Finalizar compra"
              styleClass="tw-w-full tw-flex"
              routerLink="/checkout"
            />
          }
        </p-card>
      </div>
    </p-sidebar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarShopItemsComponent {
  shopStore = inject(ShopStore);
  cdRef = inject(ChangeDetectorRef);
  visibility = false;

  toggleSidebar() {
    this.visibility = !this.visibility;
    this.cdRef.detectChanges();
  }
}
