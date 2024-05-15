import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  CarouselModule as OwlCarouselModule,
  OwlOptions,
} from 'ngx-owl-carousel-o';
import { ButtonModule } from 'primeng/button';
import { CarouselModule as PrimeCarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { CardModule } from 'primeng/card';
import { categoria_product_list, product_List } from './Inicio.type';

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
  products: product_List[] = [];
  categorias: categoria_product_list[] = [];
  responsiveOptions: any[] | undefined;

  customOptions1: OwlOptions = {
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
  ) { }

  ngOnInit(): void {
    this.fngetList()
    this.fngeCatList();

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

}
