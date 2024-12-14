import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CabeceraComponent } from '@components/cabecera/cabecera.component';
import { ShopButtonComponent } from '@components/shop-button/shop-button.component';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { MenuStore } from '@shared/store/menu.store';
import { ShopStore } from '@shared/store/shop.store';
import { MenuItem, SelectItem } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { product_List, productXCat } from '../inicio/Inicio.type';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

import { TagModule } from 'primeng/tag';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cuerpo',
  standalone: true,

  imports: [
    CabeceraComponent,
    DataViewModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RatingModule,
    DropdownModule,
    ShopButtonComponent,
    RouterLink,
  ],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.scss',
})
export class CuerpoComponent implements OnInit {
  shopStore = inject(ShopStore);
  menuStore = inject(MenuStore);
  titleCategoria = signal('');
  layout: string = 'list';
  parametro: string = '';
  products: productXCat[] = [];
  catlabel: string = '';
  sortOptions!: SelectItem[];

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  sortOrder!: number;
  sortField!: string;

  constructor(
    private route: ActivatedRoute,
    private _ecommerceService: ecommerceService,
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(async (param) => ({ menu: this.menuStore.loadMenu, param })),
      )
      .subscribe(({ param }) => {
        const categoriaParam = param['categoria'];
        const categoria = this.menuStore.getIdMenu(categoriaParam);
        this.titleCategoria.set(categoria?.nombre || 'Productos');
        this.getProducts(categoria?.id + '');
      });

    this.sortOptions = [
      { label: 'Precio de mayor a menor', value: '!precioVenta' },
      { label: 'Precio de menor a mayor', value: 'precioVenta' },
    ];
  }
  onSortChange(event: DropdownChangeEvent) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getSeverity(product: product_List) {
    switch (product.inventoryStatus) {
      case 'En Stock':
        return 'success';

      case 'Poco Stock':
        return 'warning';

      case 'Sin Stock':
        return 'danger';

      default:
        return 'success';
    }
  }

  getProducts(id: string) {
    this._ecommerceService.getProductsXCat(id).subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
      },
    });
  }
}
