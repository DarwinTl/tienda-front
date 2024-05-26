import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabeceraComponent } from '@components/cabecera/cabecera.component';
import { ShopButtonComponent } from '@components/shop-button/shop-button.component';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { ShopStore } from '@shared/store/shop.store';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { product_List } from '../inicio/Inicio.type';

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
  ],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.scss',
})
export class CuerpoComponent implements OnInit {
  shopStore = inject(ShopStore);
  layout: string = 'list';
  parametro: string = '';
  products: product_List[] = [];
  catlabel: string = '';
  sortOptions!: SelectItem[];

  sortOrder!: number;
  sortField!: string;

  constructor(
    private route: ActivatedRoute,
    private _ecommerceService: ecommerceService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.parametro = params['parametro'];
      this.getCategoriaLabel();
      this.getProducts(this.parametro);
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
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return 'success';
    }
  }

  getCategoriaLabel() {
    switch (this.parametro) {
      case '1':
        return (this.catlabel = 'Bebidas');
      case '2':
        return (this.catlabel = 'Abarrotes');
      case '3':
        return (this.catlabel = 'Golosinas');
      case '4':
        return (this.catlabel = 'Galletas');
      case '5':
        return (this.catlabel = 'Congelados');
      case '6':
        return (this.catlabel = 'Lacteos');
      case '7':
        return (this.catlabel = 'Fiambres');
      case '8':
        return (this.catlabel = 'Desayuno');
      case '9':
        return (this.catlabel = 'Mascotas');
      case '10':
        return (this.catlabel = 'Cuidado Personal');
      case '11':
        return (this.catlabel = 'Limpieza');
      default:
        return (this.catlabel = 'Todos');
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
