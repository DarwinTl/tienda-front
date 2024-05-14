import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
<<<<<<< HEAD
import {
  CarouselModule as OwlCarouselModule,
  OwlOptions,
} from 'ngx-owl-carousel-o';
import { CarouselModule as PrimeCarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
=======
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
>>>>>>> origin/develop
import { categoria_product_list, product_List } from './Inicio.type';
import { Router } from '@angular/router';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    OwlCarouselModule,
    ButtonModule,
    TagModule,
    PrimeCarouselModule,
    CardModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
<<<<<<< HEAD
  products: product_List[] = [];
  categorias: categoria_product_list[] = [];
  responsiveOptions: any[] | undefined;

  customOptions1: OwlOptions = {
=======
  productos: product_List[] = []
  categorias: categoria_product_list[] = []
  customOptions: OwlOptions = {
>>>>>>> origin/develop
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    navText: ['Anterior', 'Siguiente'],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  constructor(
    private router: Router,
    private _ecommerceService: ecommerceService,
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
    // this.fngetList()
    this.fngeCatList();
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

    // Agregar el objeto de producto al array products
    this.products.push(newProduct);
    this.products.push(newProduct);
    this.products.push(newProduct);
    this.products.push(newProduct);

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
=======
    this.fngetList()
    this.fngeCatList()
>>>>>>> origin/develop
  }

  fngetList() {
    this._ecommerceService.getProducts().subscribe({
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

  fngeCatList() {
    this._ecommerceService.getCategories().subscribe({
      next: (res) => {
<<<<<<< HEAD
        this.categorias = res;

        console.log(this.categorias);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }

  getSeverity(status: string) {
    switch (status) {
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
=======

        this.categorias = res;

        console.log(this.categorias)
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e)
        return
      }
    });
  }

>>>>>>> origin/develop
}
