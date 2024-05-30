/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopButtonComponent } from '@components/shop-button/shop-button.component';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { CastProductCartPipe } from '@shared/pipes/cast-product-cart.pipe';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { SplitterModule } from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import { productXCat } from '../inicio/Inicio.type';
InputNumberModule;
@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    ButtonModule,
    InputNumberModule,
    MessagesModule,
    GalleriaModule,
    ImageModule,
    SplitterModule,
    FormsModule,
    DividerModule,
    CarouselModule,
    TagModule,
    ShopButtonComponent,
    CastProductCartPipe,
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.scss',
})
export class ProductoDetalleComponent implements OnInit {
  value1: number = 1;
  recommendedProducts: any[] | undefined;
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  products: productXCat = {
    id: 0,
    nombre: '',
    descripcion: '',
    ruta: '',
    estado: 0,
    stock: 0,
    precioVenta: 0,
    marca: { id: 0, nombre: '', detalle: '' },
    categoria: { id: 0, nombre: '', detalle: '', icono: '' },
    medida: { id: 0, descripcion: '' },
    inventoryStatus: '',
  };
  id: string = '';

  productsM: productXCat[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _ecommerceService: ecommerceService,
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      this.getProduct(this.id);
    });

    this.images = [
      {
        itemImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc:
          'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
    ];
  }

  getProduct(id: string) {
    this._ecommerceService.getProductDetails(id).subscribe({
      next: (res) => {
        this.products = res;
        this.getProductXMarca(this.products.marca.id);
        console.log(this.products);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }

  getProductXMarca(id: number) {
    this._ecommerceService.getProductxMarca(id).subscribe({
      next: (res) => {
        this.productsM = res;

        console.log(this.productsM);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }

  getSeverity(product: productXCat) {
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
}
