import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabeceraComponent } from '@components/cabecera/cabecera.component';
<<<<<<< HEAD
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { product_List } from '../inicio/Inicio.type';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
=======
>>>>>>> origin/develop

@Component({
  selector: 'app-cuerpo',
  standalone: true,
<<<<<<< HEAD
  imports: [
    CabeceraComponent,
    DataViewModule,
    ButtonModule,
    TagModule,
    CommonModule,
    RatingModule,
    DropdownModule,
  ],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.scss',
})
export class CuerpoComponent implements OnInit {
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
    });

    const newProduct: product_List = {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    };
    const newProduct2: product_List = {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 45,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    };

    this.products.push(newProduct);
    this.products.push(newProduct);
    this.products.push(newProduct);
    this.products.push(newProduct2);
    this.products.push(newProduct2);
    this.products.push(newProduct2);
    this.sortOptions = [
      { label: 'Precio de mayor a menor', value: '!price' },
      { label: 'Precio de menor a mayor', value: 'price' },
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
        return (this.catlabel = 'Panes');
      default:
        return (this.catlabel = 'Todos');
    }
  }
=======
  imports: [CabeceraComponent],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.scss'
})
export class CuerpoComponent implements OnInit {
parametro : string = ''

constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  
  this.route.params.subscribe(params => {
    this.parametro = params['parametro'];
  
  });
}


>>>>>>> origin/develop
}
