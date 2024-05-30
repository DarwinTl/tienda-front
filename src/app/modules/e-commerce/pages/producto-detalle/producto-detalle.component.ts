import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute, Router } from '@angular/router';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { productXCat, product_List, } from '../inicio/Inicio.type';
import { HttpErrorResponse } from '@angular/common/http';
import { SplitterModule } from 'primeng/splitter';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ShopButtonComponent } from '@components/shop-button/shop-button.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, MessagesModule, GalleriaModule, ImageModule, SplitterModule, FormsModule, DividerModule,
    CarouselModule, TagModule, ShopButtonComponent, FieldsetModule, AvatarModule, DialogModule, InputTextareaModule, FloatLabelModule, ReactiveFormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.scss'
})
export class ProductoDetalleComponent implements OnInit {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
    this.comentario = new FormGroup({
      comentarioI: new FormControl('', Validators.max(250))
    });
  }
  value1: number = 1;
  recommendedProducts: any[] | undefined;
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  products: product_List = { id: 0, nombre: "", descripcion: "", ruta: "", estado: 0, stock: 0, precioVenta: 0, marca: { id: 0, nombre: "", detalle: "" }, categoria: { id: 0, nombre: "", detalle: "", icono: "" }, medida: { id: 0, descripcion: "" }, inventoryStatus: "" }
  id: string = '';
  resenas: any[] | undefined;
  comentario: FormGroup

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
        numScroll: 3
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.comentario = new FormGroup({
      comentarioI: new FormControl('', Validators.max(250))
    });



  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id)
      this.getProduct(this.id)


    });


    this.images = [
      {
        itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      }, {
        itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/0001.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      }
    ]

    this.resenas = [
      {
        nombre: 'Amy Elsner',
        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        nombre: 'Amy Elsner',
        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        nombre: 'Amy Elsner',
        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        nombre: 'Amy Elsner',
        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ];


  }


  getProduct(id: string) {
    this._ecommerceService.getProductDetails(id).subscribe({
      next: (res) => {
        this.products = res;
        this.getProductXMarca(this.products.marca.id)
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
  enviarComentario() {
    var com = this.comentario.controls['comentarioI'].value
    console.log(com)
  }



}
