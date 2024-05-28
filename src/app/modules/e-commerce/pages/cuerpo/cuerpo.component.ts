import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute, Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CabeceraComponent } from '@components/cabecera/cabecera.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { productXCat, product_List } from '../inicio/Inicio.type';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
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
    BreadcrumbModule
  ],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.scss',
})
export class CuerpoComponent implements OnInit {
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
    this.route.params.subscribe((params) => {
      this.parametro = params['parametro'];
      this.getCategoriaLabel();
      this.getProducts(this.parametro)
    });

    this.sortOptions = [
      { label: 'Precio de mayor a menor', value: '!precioVenta' },
      { label: 'Precio de menor a mayor', value: 'precioVenta' },
    ];
  }
  onSortChange(event: any) {
    let value = event.value;

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

        console.log(this.products);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }
}
